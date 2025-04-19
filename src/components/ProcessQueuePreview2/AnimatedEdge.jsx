import React from 'react';
import { getBezierPath } from 'reactflow';
import { GREY_HOVER, WHITE } from './colors';

const AnimatedEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data = {},
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const { label, moveToTop, moveToLeft, topVal, leftVal } = data;
  return (
    <g>
      <path
        id={id}
        style={{ ...style, strokeWidth: 2 }}
        className='react-flow__edge-path'
        d={edgePath}
        markerEnd={markerEnd}
      />
      {label && (
        <>
          <defs>
            <filter x='0' y='0' width='1' height='1' id='solid'>
              <feFlood floodColor={GREY_HOVER} />
              <feComposite in='SourceGraphic' operator='xor' />
            </filter>
          </defs>
          <text
            x={moveToLeft ? labelX - leftVal : labelX}
            y={moveToTop ? labelY - topVal : labelY}
            filter='url(#solid)'
            fontSize='10'
            textAnchor='middle'
            pointerEvents={'none'}
            fill={WHITE}
            fontFamily='math'
            opacity={0.7}
          >
            {label}
          </text>
          <text
            x={moveToLeft ? labelX - leftVal : labelX}
            y={moveToTop ? labelY - topVal : labelY}
            fontSize='10'
            textAnchor='middle'
            pointerEvents={'none'}
            fill={WHITE}
            fontFamily='math'
            opacity={0.7}
          >
            {label}
          </text>
        </>
      )}
      {/* Moving dot along the edge */}
      <circle r={5} fill={style.stroke}>
        <animateMotion dur='2s' repeatCount='indefinite' rotate='auto'>
          <mpath href={`#${id}`} />
        </animateMotion>
      </circle>
    </g>
  );
};

export default AnimatedEdge;
