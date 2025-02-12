import React from 'react';
import '../style/SkillSphere.css';
import renderTechnologies from '../utils/textSphere';
export default function SkillSphere() {
  renderTechnologies();
  return (
    <div
      className='text-sphere'
      style={{
        marginTop: '10px',
        marginBottom: '10px',
        textAlign: 'center',
        display: 'flex',
        margin: '0 auto',
        justifyContent: 'center',
      }}
    />
  );
}
