import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// Use a fixed row height for simplicity and stable virtualization
const DEFAULT_ROW_HEIGHT = 48;
// VirtualizedTreeView: flatten the hierarchical tree into a visible list
// and render each visible node as one fixed-height row. This avoids
// rendering the full RichTreeView per-row (which duplicated subtree UI)
// and prevents overlapping caused by dynamic/zero heights.

const VirtualizedTreeView = ({ items = [] }) => {
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const listRef = useRef();

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

  // Handle checkbox change: selecting a parent selects all descendants; unselect removes them
  const handleCheckboxChange = useCallback(
    (id, checked) => {
      setSelectedIds((prevSet) => {
        const next = new Set(prevSet);
        const descendants = getDescendantIds(id);
        if (checked) {
          next.add(id);
          for (const d of descendants) next.add(d);
        } else {
          next.delete(id);
          for (const d of descendants) next.delete(d);
        }
        return next;
      });
    },
    [getDescendantIds]
  );

  // Single fixed-height row renderer
  const Row = ({ index, style }) => {
    const { node, depth } = visibleNodes[index];
    const hasChildren = !!(node.children && node.children.length);
    const isExpanded = expandedItems.includes(node.id);
    const label = node.label || node.name || node.id;
    const checked = selectedIds.has(node.id);

    return (
      <div
        style={{
          ...style,
          display: 'flex',
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
          type='checkbox'
          style={{ marginRight: 12 }}
          checked={checked}
          onChange={(e) => handleCheckboxChange(node.id, e.target.checked)}
        />

        <div style={{ lineHeight: 1 }}>{label}</div>
      </div>
    );
  };

  // When expandedItems changes, ensure list re-renders from top
  useEffect(() => {
    listRef.current?.resetAfterIndex?.(0);
  }, [expandedItems]);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef}
            height={height}
            itemCount={visibleNodes.length}
            itemSize={DEFAULT_ROW_HEIGHT}
            width={width}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default VirtualizedTreeView;
