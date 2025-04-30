import React from 'react';
import { getBezierPath } from 'reactflow';
import { GREY_HOVER, WHITE, ORANGE, YELLOW } from './colors';

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

  const { label, moveToTop, moveToLeft, topVal, leftVal, step, activeStep } =
    data;
  const highlighEdge = step === activeStep;
  const processFinished = activeStep === 5;
  return (
    <g>
      {(highlighEdge || processFinished) && (
        <path
          id={id}
          style={{ ...style, strokeWidth: 2 }}
          className='react-flow__edge-path'
          d={edgePath}
          markerEnd={markerEnd}
        />
      )}
      {label && (highlighEdge || processFinished) && (
        <>
          <defs>
            <defs>
              <filter x='0' y='0' width='1' height='1' id={`solid-${id}`}>
                <feFlood floodColor={highlighEdge ? ORANGE : GREY_HOVER} />
                <feComposite in='SourceGraphic' operator='xor' />
              </filter>
            </defs>
          </defs>
          <text
            x={moveToLeft ? labelX - leftVal : labelX}
            y={moveToTop ? labelY - topVal : labelY}
            filter={`url(#solid-${id})`}
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
      {(highlighEdge || processFinished) && (
        <circle r={5} fill={style.stroke}>
          <animateMotion
            dur={highlighEdge || processFinished ? '2s' : '0s'}
            repeatCount='indefinite'
            rotate='auto'
          >
            <mpath href={`#${id}`} />
          </animateMotion>
        </circle>
      )}
    </g>
  );
};

export default AnimatedEdge;
