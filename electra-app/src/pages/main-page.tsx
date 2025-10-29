import React from 'react';
import '../styles/pages/MainPage.css';

const MainPage: React.FC = () => {
  return (
    <main className="main-page">
      <div className="main-page-inner">
        <h1 className="main-page-title">Electra</h1>
        <p className="main-page-desc">
          Upload and explore electric power grid models. Electra parses your files with
          VeraGridEngine, stores the grid in a database, and lets you inspect components like
          buses, lines, generators, loads, shunts, and transformers.
        </p>
      </div>
    </main>
  );
};

export default MainPage;
