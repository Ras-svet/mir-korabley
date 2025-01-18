import React from 'react';
import ReactDOM from 'react-dom/client'
import './styles/global.scss';
import ShipsPage from './pages/ships-page/ships-page';

const App: React.FC = () => (
  <div>
    <h1>Мир Кораблей</h1>
    <ShipsPage />
  </div>
)

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
