import { createRoot } from 'react-dom/client';
import './index.css';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';

const rootElement: HTMLElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
  // <React.StrictMode>
  <Router>
    <App />
  </Router>
  // </React.StrictMode>
);
