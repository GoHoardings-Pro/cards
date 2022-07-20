import './App.css';
import Odousers from './component/Odousers';
import Cart from './component/Cart';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
       <BrowserRouter>
    <Routes>
        <Route exact path="/"  element={<Odousers/>} />
        <Route exact path='/cart' element={<Cart/>} />
    </Routes>
  </BrowserRouter>
    </>
  );
}

export default App;
