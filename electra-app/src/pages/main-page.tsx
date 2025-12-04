import React from 'react';
import '../styles/pages/MainPage.css';
import GridViewer from '../components/GridViewer';

const MainPage: React.FC = () => {
  return (
    <main className="main-page">
      <div className="main-page-inner">
        <div className="main-page-viewer-bleed">
          <GridViewer />
        </div>
      </div>
    </main>
  );
};

export default MainPage;
