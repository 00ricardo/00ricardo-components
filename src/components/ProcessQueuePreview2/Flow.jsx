// src/components/Flow.jsx
import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import AnimatedEdge from './AnimatedEdge';
import DatabaseIcon from './Icons/DatabaseIcon';
import LaptopIcon from './Icons/LaptopIcon';
import FlowStepper from './FlowStepper';
import {
  BLUE,
  GREEN,
  GREY,
  GREY_DISABLED,
  GREY_HOVER,
  LIGHT_GREY,
  ORANGE,
  RED_ERROR,
  WHITE,
  YELLOW,
} from './colors';
const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 0 },
    draggable: false,
    data: {
      label: 'LDS UI Application',
      icon: <LaptopIcon />,
      borderColor: ORANGE,
      sourcePosition: Position.Top,
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 0, y: -200 },
    draggable: false,
    data: {
      label: 'LDSI_OWNER',
      icon: <DatabaseIcon />,
      borderColor: GREY,
      sourcePosition: Position.Top,
      targetPosition: Position.Top,
      bottomTarget: true,
      rightTarget: true,
      leftTarget: true,
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: -450, y: -400 },
    draggable: false,
    data: {
      label: 'LDSI_ADMIN [RBG]',
      icon: <DatabaseIcon />,
      borderColor: YELLOW,
      sourcePosition: Position.Left,
      targetPosition: Position.Bottom,
      rightTarget: true,
      leftTarget: true,
    },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: -300, y: -600 },
    draggable: false,
    data: {
      label: 'LDSI_ADMIN [KLM]',
      icon: <DatabaseIcon />,
      borderColor: BLUE,
      sourcePosition: Position.Left,
      targetPosition: Position.Bottom,
      rightTarget: true,
      leftTarget: true,
    },
  },
  {
    id: '5',
    type: 'custom',
    position: { x: 300, y: -600 },
    draggable: false,
    data: {
      label: 'LDSI_ADMIN [PEN]',
      icon: <DatabaseIcon />,
      borderColor: GREEN,
      sourcePosition: Position.Right,
      targetPosition: Position.Bottom,
      rightTarget: true,
      leftTarget: true,
    },
  },
  {
    id: '6',
    type: 'custom',
    position: { x: 450, y: -400 },
    draggable: false,
    data: {
      label: 'LDSI_ADMIN [WUX]',
      icon: <DatabaseIcon />,
      borderColor: RED_ERROR,
      sourcePosition: Position.Right,
      targetPosition: Position.Bottom,
      rightTarget: true,
      leftTarget: true,
    },
  },
];

const initialEdges = [
  {
    id: '1->2',
    source: '1',
    target: '2',
    type: 'animated',
    style: { stroke: ORANGE },
    data: { label: 'INITIAL_REQUEST (1)' },
    targetHandle: 'bottomTarget',
  },
  {
    id: '2->3',
    source: '2',
    target: '3',
    type: 'animated',
    style: { stroke: GREY },
    data: {
      label: 'CHANGE_REQUEST (2)',

      moveToTop: true,
      moveToLeft: true,
      topVal: 50,
      leftVal: 210,
    },
    targetHandle: 'rightTarget',
  },
  {
    id: '2->4',
    source: '2',
    target: '4',
    type: 'animated',
    style: { stroke: GREY },
    data: {
      label: 'CHANGE_REQUEST (2)',

      moveToTop: true,
      moveToLeft: true,
      leftVal: 80,
      topVal: 80,
    },
    targetHandle: 'rightTarget',
  },
  {
    id: '2->5',
    source: '2',
    target: '5',
    type: 'animated',
    style: { stroke: GREY },
    data: {
      label: 'CHANGE_REQUEST (2)',

      moveToTop: true,
      moveToLeft: true,
      leftVal: -80,
      topVal: 80,
    },
    targetHandle: 'leftTarget',
  },
  {
    id: '2->6',
    source: '2',
    target: '6',
    type: 'animated',
    style: { stroke: GREY },
    data: {
      label: 'CHANGE_REQUEST (2)',

      moveToTop: true,
      moveToLeft: true,
      topVal: 50,
      leftVal: -210,
    },
    targetHandle: 'leftTarget',
  },
  {
    id: '3->2',
    source: '3',
    target: '2',
    type: 'animated',
    style: { stroke: YELLOW },
    data: {
      label: 'SYNC_REQUEST (3)',
      moveToTop: true,
      moveToLeft: true,
      topVal: -40,
      leftVal: -80,
    },
    targetHandle: 'bottomTarget',
  },
  {
    id: '4->2',
    source: '4',
    target: '2',
    type: 'animated',
    style: { stroke: BLUE },
    data: {
      label: 'SYNC_REQUEST (3)',

      moveToTop: true,
      moveToLeft: true,
      topVal: -80,
      leftVal: -50,
    },
    targetHandle: 'bottomTarget',
  },
  {
    id: '5->2',
    source: '5',
    target: '2',
    type: 'animated',
    style: { stroke: GREEN },
    data: {
      label: 'SYNC_REQUEST (3)',

      moveToTop: true,
      moveToLeft: true,
      topVal: -80,
      leftVal: 50,
    },
    targetHandle: 'bottomTarget',
  },
  {
    id: '6->2',
    source: '6',
    target: '2',
    type: 'animated',
    style: { stroke: RED_ERROR },
    data: {
      label: 'SYNC_REQUEST (3)',

      moveToTop: true,
      moveToLeft: true,
      topVal: -40,
      leftVal: 80,
    },
    targetHandle: 'bottomTarget',
  },
  {
    id: '2->3->res',
    source: '2',
    target: '3',
    type: 'animated',
    style: { stroke: GREY },
    data: {
      label: 'SYNC_RESPONSE (4)',
      moveToLeft: true,
      moveToTop: true,
      topVal: 20,
      leftVal: 100,
    },
  },
  {
    id: '2->4->res',
    source: '2',
    target: '4',
    type: 'animated',
    style: { stroke: GREY },
    data: {
      label: 'SYNC_RESPONSE (4)',
      moveToTop: true,
      moveToLeft: true,
      topVal: 80,
      leftVal: 80,
    },
  },
  {
    id: '2->5->res',
    source: '2',
    target: '5',
    type: 'animated',
    style: { stroke: GREY },
    data: {
      label: 'SYNC_RESPONSE (4)',
      moveToTop: true,
      moveToLeft: true,
      topVal: 80,
      leftVal: -80,
    },
  },
  {
    id: '2->6->res',
    source: '2',
    target: '6',
    type: 'animated',
    style: { stroke: GREY },
    data: {
      label: 'SYNC_RESPONSE (4)',

      moveToLeft: true,
      moveToTop: true,
      topVal: 20,
      leftVal: -100,
    },
  },
];

const edgeTypes = {
  animated: AnimatedEdge,
};

export default function Flow() {
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={{ custom: CustomNode }}
        defaultViewport={{ x: 600, y: 620, zoom: 1 }}
        edgeTypes={edgeTypes}
      >
        <Background />
        <Controls />
        <MiniMap />
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: WHITE,
            border: `1px solid ${LIGHT_GREY}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            zIndex: 10,
          }}
        >
          <FlowStepper />
        </div>
      </ReactFlow>
    </div>
  );
}
