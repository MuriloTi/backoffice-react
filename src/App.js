import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pessoas from './components/Pessoas';
import Departamentos from './components/Departamentos';
import Home from './components/Home';
import Header from './components/Header';
import NotFound from './components/NotFound';
import DetailsPessoa from './components/Pessoas/DetailsPessoa';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/pessoas' element={<Pessoas />} />
          <Route path='/pessoa-details/:id' element={<DetailsPessoa />} />
          <Route path='/departamentos' element={<Departamentos />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
