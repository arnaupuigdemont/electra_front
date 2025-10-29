import MenuBar from './components/MenuBar';
import MainPage from './pages/main-page';
import './styles/app.css';
import { GridProvider } from './hooks/GridContext';

function App() {
  return (
    <GridProvider>
      <div className="app-shell">
        <MenuBar />
        <MainPage />
      </div>
    </GridProvider>
  );
}

export default App;
