import MenuBar from './components/MenuBar';
import './styles/app.css';
import { GridProvider } from './hooks/GridContext';

function App() {
  return (
    <GridProvider>
      <div className="app-shell">
        <MenuBar />
      </div>
    </GridProvider>
  );
}

export default App;
