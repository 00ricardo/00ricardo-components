import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { List } from 'react-window';

// Use a fixed row height for simplicity and stable virtualization
const DEFAULT_ROW_HEIGHT = 48;
// VirtualizedTreeView: flatten the hierarchical tree into a visible list
// and render each visible node as one fixed-height row. This avoids
// rendering the full RichTreeView per-row (which duplicated subtree UI)
// and prevents overlapping caused by dynamic/zero heights.

const VirtualizedTreeView = ({ items = [] }) => {
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [disabledIds, setDisabledIds] = useState(new Set([1, 3, 4, 6]));
  const listRef = useRef();

  /**
   * Expand all tree items, including children of children.
   * @function
   */
  const expandAll = () => {
    const allIds = [];
    const walk = (nodes) => {
      if (!nodes) return;
      for (const n of nodes) {
        allIds.push(n.id);
        if (n.children) walk(n.children);
      }
    };
    walk(items);
    setExpandedItems(allIds);
  };
  /**
   * Select all visible tree items, including children of children.
   * If disabledSet is provided, it will skip selecting disabled nodes.
   * @function
   */
  const selectAll = () => {
    const allIds = new Set();
    /**
     * Recursively traverse a tree and add all non-disabled node IDs to a Set.
     * If disabledSet is provided, it will skip adding disabled node IDs.
     * @param {Array<Object>} nodes - The tree nodes to traverse.
     * @param {Set<string>} [disabledSet] - A Set of disabled node IDs to skip.
     */
    const walk = (nodes) => {
      if (!nodes) return;
      for (const n of nodes) {
        // Skip disabled nodes when selecting all
        if (!disabledSet || !disabledSet.has(String(n.id))) allIds.add(n.id);
        if (n.children) walk(n.children);
      }
    };
    walk(items);
    setSelectedIds(allIds);
  };

  /**
   * Deselect all visible tree items, including children of children.
   * @function
   */
  const deselectAll = () => {
    setSelectedIds(new Set());
  };

  /**
   * Collapse all tree items, including children of children.
   * This resets the expandedItems state to an empty array.
   * @function
   */
  const collapseAll = () => {
    setExpandedItems([]);
  };

  // Toggle expand/collapse for a node id
  const toggleExpanded = (id) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Flatten the tree into a visible nodes array according to expandedItems
  const visibleNodes = useMemo(() => {
    const out = [];
    const walk = (nodes, depth = 0) => {
      if (!nodes) return;
      for (const node of nodes) {
        out.push({ node, depth });
        if (node.children && expandedItems.includes(node.id)) {
          walk(node.children, depth + 1);
        }
      }
    };
    walk(items);
    return out;
  }, [items, expandedItems]);

  // Build a map of id -> node to help with descendant lookups
  const nodeMap = useMemo(() => {
    const map = new Map();
    const walk = (nodes) => {
      if (!nodes) return;
      for (const n of nodes) {
        map.set(n.id, n);
        if (n.children) walk(n.children);
      }
    };
    walk(items);
    return map;
  }, [items]);

  // Get all descendant ids for a given node id (including deep children)
  const getDescendantIds = useCallback(
    (id) => {
      const out = [];
      const start = nodeMap.get(id);
      if (!start || !start.children) return out;
      const walk = (nodes) => {
        for (const n of nodes) {
          out.push(n.id);
          if (n.children) walk(n.children);
        }
      };
      walk(start.children);
      return out;
    },
    [nodeMap]
  );

  // Resolve disabledIds into actual node ids (strings) using `items`
  const baseDisabled = useMemo(() => {
    const out = new Set();
    for (const v of disabledIds) {
      if (typeof v === 'number') {
        const idx = v - 1; // treat as 1-based index into top-level `items`
        const it = items?.[idx];
        if (it && it.id != null) out.add(String(it.id));
      } else if (v != null) {
        out.add(String(v));
      }
    }
    return out;
  }, [disabledIds, items]);

  // Expand disabled set to include all descendants of disabled parents
  const disabledSet = useMemo(() => {
    const out = new Set(baseDisabled);
    for (const id of Array.from(baseDisabled)) {
      const desc = getDescendantIds(id);
      for (const d of desc) out.add(d);
    }
    return out;
  }, [baseDisabled, getDescendantIds]);

  // Build a map of id -> parentId to walk ancestors quickly
  const parentMap = useMemo(() => {
    const map = new Map();
    const walk = (nodes, parentId = null) => {
      if (!nodes) return;
      for (const n of nodes) {
        if (parentId) map.set(n.id, parentId);
        if (n.children) walk(n.children, n.id);
      }
    };
    walk(items, null);
    return map;
  }, [items]);

  // Get all ancestor ids for a given node id (up to root)
  const getAncestorIds = useCallback(
    (id) => {
      const out = [];
      let current = parentMap.get(id);
      while (current) {
        out.push(current);
        current = parentMap.get(current);
      }
      return out;
    },
    [parentMap]
  );

  // Handle checkbox change: selecting a parent selects all descendants; unselect removes them
  const handleCheckboxChange = useCallback(
    (id, checked) => {
      setSelectedIds((prevSet) => {
        const next = new Set(prevSet);
        const descendants = getDescendantIds(id);
        const ancestors = getAncestorIds(id);
        const node = nodeMap.get(id);

        // If the target node is disabled, ignore selection changes
        if (disabledSet.has(id)) return next;

        if (checked) {
          if (node && node.children) {
            // 1) Checking a parent -> check it and all non-disabled descendants
            if (!disabledSet.has(id)) next.add(id);
            for (const d of descendants) if (!disabledSet.has(d)) next.add(d);
          } else {
            // 2) Checking a child -> check the child and ensure ancestors are checked
            next.add(id);
            for (const a of ancestors) if (!disabledSet.has(a)) next.add(a);
          }
        } else {
          if (node && node.children) {
            // 3) Unchecking a parent -> uncheck it and all descendants
            next.delete(id);
            for (const d of descendants) next.delete(d);
          } else {
            // 4) Unchecking a child -> remove it; then for each ancestor, if none of its
            // non-disabled descendants remain checked, uncheck the ancestor.
            next.delete(id);
            for (const a of ancestors) {
              const aDesc = getDescendantIds(a).filter(
                (did) => !disabledSet.has(did)
              );
              const anyChecked = aDesc.some((did) => next.has(did));
              if (!anyChecked) next.delete(a);
            }
          }
        }

        return next;
      });
    },
    [getDescendantIds, getAncestorIds, nodeMap, disabledSet]
  );

  // Single fixed-height row renderer
  const Row = ({ index, style }) => {
    const { node, depth } = visibleNodes[index];
    const hasChildren = !!(node.children && node.children.length);
    const isExpanded = expandedItems.includes(node.id);
    const label = node.label || node.name || node.id;
    const checked = selectedIds.has(node.id);
    const isDisabled = disabledSet.has(String(node.id));

    // indeterminate: some (but not all) non-disabled descendants are checked
    const descendantIds = getDescendantIds(node.id);
    const relevantIds = descendantIds
      .concat([node.id])
      .filter((id) => !disabledSet.has(String(id)));
    const checkedCount = relevantIds.filter((id) => selectedIds.has(id)).length;
    const totalCount = relevantIds.length;
    const indeterminate =
      totalCount > 0 && checkedCount > 0 && checkedCount < totalCount;
    const checkboxRef = React.useRef(null);
    useEffect(() => {
      if (checkboxRef.current)
        checkboxRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <div
        style={{
          ...style,
          display: 'flex',
          background: index % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent',
          alignItems: 'center',
          paddingLeft: 8 + depth * 16,
          boxSizing: 'border-box',
          borderBottom: '1px solid rgba(0,0,0,0.04)',
        }}
      >
        {hasChildren ? (
          <button
            aria-label={isExpanded ? 'collapse' : 'expand'}
            onClick={() => toggleExpanded(node.id)}
            style={{
              width: 28,
              height: 28,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {isExpanded ? '▾' : '▸'}
          </button>
        ) : (
          <div style={{ width: 28 }} />
        )}
        <input
          ref={checkboxRef}
          type='checkbox'
          style={{
            marginRight: 12,
            cursor: isDisabled ? 'not-allowed' : 'pointer',
          }}
          checked={checked}
          disabled={isDisabled}
          onChange={(e) => handleCheckboxChange(node.id, e.target.checked)}
        />
        <div
          style={{
            lineHeight: 1,
            color: isDisabled ? '#999' : '#000',
            fontSize: 14,
            opacity: isDisabled ? 0.6 : 1,
          }}
        >
          {label}
        </div>
      </div>
    );
  };

  return (
    <div style={{ height: 600, width: '100%' }}>
      <button onClick={expandAll}>Expand All</button>
      <button onClick={collapseAll}>Collapse All</button>
      <button onClick={selectAll}>Select All</button>
      <button onClick={deselectAll}>Deselect All</button>
      <AutoSizer disableHeight={true}>
        {({ height, width }) => {
          const safeHeight = height || 600;
          const safeWidth = width || '100%';
          return (
            <List
              listRef={listRef}
              defaultHeight={safeHeight}
              rowCount={visibleNodes.length}
              rowHeight={DEFAULT_ROW_HEIGHT}
              rowComponent={Row}
              rowProps={{}}
              style={{ width: safeWidth, height: safeHeight }}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default VirtualizedTreeView;
