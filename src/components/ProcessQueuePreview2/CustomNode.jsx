// src/components/CustomNode.jsx
import React from 'react';
import { Handle, Position } from 'reactflow';
import { GREY, WHITE } from './colors';

export default function CustomNode({ data }) {
  return (
    <div
      className='custom-node'
      style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: WHITE,
        border: '4px solid',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: GREY,
        borderColor: data.borderColor,
      }}
    >
      <Handle
        type='target'
        position={data.targetPosition || Position.Top}
        style={{ background: data.borderColor }}
        isConnectable={false}
      />
      {data.bottomTarget && (
        <Handle
          id='bottomTarget'
          type='target'
          position={Position.Bottom}
          style={{ background: data.borderColor }}
          isConnectable={false}
        />
      )}
      {data.rightTarget && (
        <Handle
          id='rightTarget'
          type='target'
          position={Position.Right}
          style={{ background: data.borderColor }}
          isConnectable={false}
        />
      )}
      {data.leftTarget && (
        <Handle
          id='leftTarget'
          type='target'
          position={Position.Left}
          style={{ background: data.borderColor }}
          isConnectable={false}
        />
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
        <span>{data.icon}</span>
        <span>{data.label}</span>
      </div>
      <Handle
        type='source'
        position={data.sourcePosition || Position.Bottom}
        style={{ background: data.borderColor }}
        isConnectable={false}
      />
    </div>
  );
}
