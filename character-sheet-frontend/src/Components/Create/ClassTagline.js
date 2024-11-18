import React from 'react';

const ClassTagline = ({ classInfo }) => {
  const tagline = classInfo?.Tagline || "No tagline available";

  return (
    <div className="class-tagline">
      <i>{tagline}</i>
    </div>
  );
};

export default ClassTagline;