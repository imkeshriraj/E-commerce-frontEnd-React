import './App.css';
import FooterComponent from './components/FooterComponent';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route Component={PrivateComponent}>
            <Route path='/' Component={ProductList} />
            <Route path='/add' Component={AddProduct} />
            <Route path='/add' element={'add product comp'} />
            <Route path='/update/:id' Component={UpdateProduct} />
            <Route path='/logout' element={'logout  comp'} />
            <Route path='/profile' element={'profile comp'} />
          </Route>
          <Route path='/signup' Component={SignUp} />
          <Route path='/login' Component={Login} />
        </Routes>
      </BrowserRouter>
      <FooterComponent />
    </div>
  );
}

export default App;
