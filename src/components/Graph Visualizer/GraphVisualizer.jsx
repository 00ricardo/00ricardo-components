import React, { useCallback, useEffect, useRef } from 'react';
import { ReactFlow, Panel, useNodesState, useEdgesState } from '@xyflow/react';
import dagre from 'dagre';
import '@xyflow/react/dist/style.css';
import './style.css';
import { initialNodes, initialEdges } from './nodes-edges.js';
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 172;
const nodeHeight = 36;
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
  dagre.layout(dagreGraph);
  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });
  return { nodes: newNodes, edges };
};

const GraphVisualizer = () => {
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );
  const [nodes, setNodes] = useNodesState(layoutedNodes);
  const [edges, setEdges] = useEdgesState(layoutedEdges);
  const reactFlowRef = useRef(null);

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodes, edges]
  );

  useEffect(() => {
    if (initialNodes.length > 0 && reactFlowRef) {
      const react_flow_nodes =
        document.getElementsByClassName('react-flow__node');

      for (let i = 0; i < react_flow_nodes.length; i++) {
        console.log(react_flow_nodes[i]);
        console.log(initialNodes[i]);

        const sourceNode = initialNodes[i].id;
        const sourceNodeType = initialEdges.find(
          (edge) => edge.source === sourceNode
        );
        console.log(sourceNodeType.label);
        react_flow_nodes[i].style.backgroundColor =
          sourceNodeType.label === 'SPLIT'
            ? 'blue'
            : sourceNodeType.label === 'MERGE'
              ? 'yellow'
              : '';
      }
    }
  }, [initialNodes, initialEdges, reactFlowRef]);
  return (
    <div style={{ height: '95vh', width: '100%' }}>
      <ReactFlow ref={reactFlowRef} nodes={nodes} edges={edges} node fitView>
        <Panel position='top-right'>
          <button onClick={() => onLayout('TB')}>vertical layout</button>
          <button onClick={() => onLayout('LR')}>horizontal layout</button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default GraphVisualizer;
