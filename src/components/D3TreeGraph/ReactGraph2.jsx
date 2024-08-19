import React, { useEffect, useState, useRef, useCallback } from 'react';
import fore from './fore2.json';
import { ForceGraph2D } from 'react-force-graph';
import { forceCollide } from 'd3';
import { hasValue } from '00ricardo-utils';
import PermanentDrawerRight from './PermanentDrawerRight';
const ReactGraph2 = () => {
  const fgRef = useRef();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [nodeSelected, setNodeSelected] = useState({ node: {}, children: [] });
  const [crossSiteNodes, setCrossSiteNodes] = useState([]);
  const [searchLot, setSearchLot] = useState('');
  const extractNodesWithPaths = (data) => {
    const nodesMap = new Map();
    const pathsMap = new Map(); // Stores the calculated paths
    const childrenMap = new Map(); // To store parent-children relationships
    const parentSet = new Set(); // To track all nodes that are parents

    // First pass: Create all nodes and build parent-child relationships
    data.forEach(
      ({
        parent_source_label,
        parent_source_lotid,
        parent_system,
        forecast_source_label,
        forecast_lot,
        forecast_system,
        node_level,
      }) => {
        const parentLeaf = `${parent_source_lotid}_${parent_system}`;
        const forecastLeaf = `${forecast_lot}_${forecast_system}`;

        if (!nodesMap.has(parentLeaf)) {
          nodesMap.set(parentLeaf, {
            leaf: parentLeaf,
            path: '', // To be calculated
            level: node_level - 1,
            label: parent_source_label,
            lotid: parent_source_lotid,
            source_system: parent_system,
          });
        }

        if (!nodesMap.has(forecastLeaf)) {
          nodesMap.set(forecastLeaf, {
            leaf: forecastLeaf,
            path: '', // To be calculated
            level: node_level,
            label: forecast_source_label,
            lotid: forecast_lot,
            source_system: forecast_system,
          });
        }

        // Track the parent relationships
        if (!childrenMap.has(parentLeaf)) {
          childrenMap.set(parentLeaf, []);
        }
        childrenMap.get(parentLeaf).push(forecastLeaf);
        parentSet.add(forecastLeaf);
      }
    );

    // Helper function to build paths recursively using `leaf` instead of `label`
    const buildPath = (leaf, currentPath = '') => {
      if (pathsMap.has(leaf)) {
        return pathsMap.get(leaf);
      }

      const node = nodesMap.get(leaf);
      const newPath = currentPath ? `${currentPath}/${leaf}` : leaf;
      pathsMap.set(leaf, newPath);

      if (childrenMap.has(leaf)) {
        childrenMap.get(leaf).forEach((childLeaf) => {
          buildPath(childLeaf, newPath);
        });
      }

      return newPath;
    };

    // Second pass: Calculate paths for each node
    nodesMap.forEach((node, leaf) => {
      if (parentSet.has(leaf)) {
        node.path = buildPath(leaf);
      }
    });

    return Array.from(nodesMap.values());
  };
  const extractLinks = (data, nodes) => {
    const nodesMap = new Map(nodes.map((node) => [node.leaf, node]));

    const links = data.map(
      ({
        parent_source_lotid,
        parent_system,
        forecast_lot,
        forecast_system,
        type,
      }) => {
        const sourceLeaf = `${parent_source_lotid}_${parent_system}`;
        const targetLeaf = `${forecast_lot}_${forecast_system}`;

        return {
          source: nodesMap.get(sourceLeaf), // Source node object
          target: nodesMap.get(targetLeaf), // Target node object
          targetNode: nodesMap.get(targetLeaf), // Copy of target node object
          label: type, // Type of relationship as the link label
          arrowColor: '#fff',
        };
      }
    );

    return links;
  };
  const getDirectChildrenWithLinks = (leaf, data, nodes) => {
    return data
      .filter(
        ({ parent_source_lotid, parent_system }) =>
          `${parent_source_lotid}_${parent_system}` === leaf
      )
      .map(({ forecast_lot, forecast_system, type }) => {
        const childLeaf = `${forecast_lot}_${forecast_system}`;
        const childNode = nodes.find((node) => node.leaf === childLeaf);
        return {
          node: childNode, // The full child node object
          relationType: type, // The relation type (SPLIT, MERGE, etc.)
        };
      });
  };
  const getCrossSiteNodes = (data) => {
    return data
      .filter(
        (rel) => rel.forecast_system !== 'RBG' || rel.parent_system !== 'RBG'
      )
      .map(
        ({ forecast_lot, forecast_system }) =>
          `${forecast_lot}_${forecast_system}`
      );
  };
  const getRootNode = (nodes) => {
    return nodes.find((node) => node.level === 0);
  };
  const focusNode = (lot) => {
    const fg = fgRef.current;
    if (lot) {
      fg.centerAt(lot.x, lot.y);
      fg.zoom(1);
    }
  };
  const deepSearch = useCallback(() => {
    const lot = graphData.nodes.find(
      (n) => n.lotid === searchLot || n.label === searchLot
    );
    setNodeSelected({
      node: { ...lot },
      children: [
        ...getDirectChildrenWithLinks(lot.leaf, fore.items, graphData.nodes),
      ],
    });
    focusNode(lot);
  }, [searchLot]);
  useEffect(() => {
    const data = fore.items;
    const nodes = extractNodesWithPaths(data);
    const links = extractLinks(data, nodes);
    const crossiteRelations = getCrossSiteNodes(data);
    setCrossSiteNodes([...crossiteRelations]);
    console.log({
      data,
      nodes,
      links,
      crossiteRelations,
    });
    setGraphData({ nodes, links });
  }, []);
  // ! Add collision force and set Zoom Level
  useEffect(() => {
    const fg = fgRef.current;
    fg.d3Force(
      'collision',
      forceCollide((node) => Math.sqrt(100 / (node.level + 1)))
    );

    const root = getRootNode(graphData.nodes);
    if (hasValue(root)) {
      setTimeout(() => {
        fg.centerAt(root.x, root.y);
        fg.zoom(0.7);
      }, 500);
    }
    console.log(root);
  }, [graphData]);

  return (
    <div style={{ backgroundColor: '#101020' }}>
      <ForceGraph2D
        ref={fgRef}
        minZoom={0.1}
        maxZoom={2}
        d3AlphaDecay={0.05} // Slower decay for a longer force simulation
        d3VelocityDecay={0.4} // Reduce to increase movement
        graphData={graphData}
        cooldownTicks={50}
        linkWidth={1}
        linkDirectionalParticleSpeed={0.002}
        linkDirectionalParticles={5}
        linkDirectionalArrowLength={0}
        linkDirectionalArrowRelPos={1}
        linkDirectionalArrowColor={'arrowColor'}
        linkColor={() => 'rgba(255,255,255,0.1)'}
        nodeVal={(node) => (node.index === 0 ? 500 : 10)} // ! Node Value Size
        nodeRelSize={1} // ! -> Node Relative Size to its value
        nodeId='leaf'
        nodeLabel='label'
        linkLabel='label'
        nodeColor={
          (e) =>
            hasValue(nodeSelected) && e.leaf === nodeSelected.node.leaf
              ? 'yellow'
              : e.index === 0
                ? '#ff7b00' // ! Orange
                : crossSiteNodes.includes(e.leaf)
                  ? '#0093ff' // ! Green
                  : '#4c8a38' // ! Blue
        }
        onNodeClick={(node) => {
          setNodeSelected({
            node: { ...node },
            children: [
              ...getDirectChildrenWithLinks(
                node.leaf,
                fore.items,
                graphData.nodes
              ),
            ],
          });
        }}
      />
      <PermanentDrawerRight
        relations={nodeSelected}
        setNodeSelected={setNodeSelected}
        getDirectChildrenWithLinks={getDirectChildrenWithLinks}
        data={fore.items}
        nodes={graphData.nodes}
        searchLot={searchLot}
        setSearchLot={setSearchLot}
        deepSearch={deepSearch}
        focusNode={focusNode}
      />
    </div>
  );
};

export default ReactGraph2;
