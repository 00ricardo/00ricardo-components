import React, { useState, useEffect, useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import * as d3 from 'd3';
import dat from 'dat.gui';

const ReacGraph = () => {
  const fgRef = useRef();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [controls] = useState({ 'DAG Orientation': 'radialout' });

  const useForceUpdate = () => {
    const setToggle = useState(false)[1];
    return () => setToggle((b) => !b);
  };
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    // Initialize dat.GUI controls
    const gui = new dat.GUI();
    gui
      .add(controls, 'DAG Orientation', [
        'td',
        'bu',
        'lr',
        'rl',
        'radialout',
        'radialin',
        null,
      ])
      .onChange(forceUpdate);

    return () => gui.destroy(); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    // Add collision force
    fgRef.current.d3Force(
      'collision',
      d3.forceCollide((node) => Math.sqrt(100 / (node.level + 1)))
    );
  }, [graphData]);

  useEffect(() => {
    // Fetch and parse the CSV data
    fetch('d3-dependencies.csv')
      .then((response) => response.text())
      .then(d3.csvParse)
      .then((data) => {
        const nodes = [],
          links = [];
        data.forEach(({ path }) => {
          const levels = path.split('/'),
            level = levels.length,
            module = level > 0 ? levels[1] : null, // Group by Module
            leaf = levels.pop(),
            parent = levels.join('/');

          const node = {
            path,
            leaf,
            module,
            size: 20,
            level,
          };
          // node.path -> it is the node label
          // node.color -> it is the node color
          node.label = 'Ricardo';
          nodes.push(node);

          if (parent) {
            links.push({
              source: parent,
              target: path,
              targetNode: node,
              label: 'abcdef',
            });
          }
        });
        console.log({ nodes, links });
        setGraphData({ nodes, links });
      });
  }, []);
  console.log(controls);
  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={graphData}
      dagMode={controls['DAG Orientation']}
      dagLevelDistance={100}
      backgroundColor='#101020'
      linkColor={() => 'rgba(255,255,255,0.2)'}
      nodeRelSize={1} // -> Node Size
      nodeId='path'
      nodeVal={(node) => 100 / (node.level + 1)}
      nodeLabel='label'
      linkLabel='label'
      nodeAutoColorBy='module' // Group by Module
      d3VelocityDecay={0.3}
      onNodeClick={(node, evt) => {
        console.log(node);
        console.log(evt);
      }}
    />
  );
};

export default ReacGraph;
