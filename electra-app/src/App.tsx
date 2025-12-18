import { useState } from 'react';
import MenuBar from './components/MenuBar';
import MainPage from './pages/main-page';
import DocsPage from './pages/DocsPage';
import './styles/app.css';
import { GridProvider } from './hooks/GridContext';

type Page = 'main' | 'docs';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('main');

  return (
    <GridProvider>
      <div className="app-shell">
        {currentPage === 'main' ? (
          <>
            <MenuBar onNavigateDocs={() => setCurrentPage('docs')} />
            <MainPage />
          </>
        ) : (
          <DocsPage onBack={() => setCurrentPage('main')} />
        )}
      </div>
    </GridProvider>
  );
}

export default App;
