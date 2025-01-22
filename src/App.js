import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Busca from './pages/busca';
import Header from './components/header';

function App() {
  return (
   <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Busca/>}/>
      </Routes>
    
   </div>
  );
}

export default App;
