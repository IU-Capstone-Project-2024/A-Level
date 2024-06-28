import './App.css';
import Header from './components/Header/Header';
import { Outlet } from 'react-router';
import { useTab } from './context/TabContext';


export default function App() {
  const { tab, setTab } = useTab();
  return (
    <div className="App">
      <Header onClick={setTab} active={tab}/>
      <Outlet />
      
    </div>
  );
}