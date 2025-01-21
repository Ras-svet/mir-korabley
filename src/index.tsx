import React from 'react';
import ReactDOM from 'react-dom/client'
import './styles/global.scss';
import ShipsPage from './pages/ships-page/ships-page';

const App: React.FC = () => (
  <div className="app">
    <h1 className="app__title">
      Кораблеведение
    </h1>
    <ShipsPage />
  </div>
)

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
