import Header from './Components/Layout/Header'
import './App.css';
import Meals from './Components/Meals/Meals';
import Cart from "./Components/Cart/Cart";
import {useState} from "react";
import CartProvider from './Store/CartProvider';


function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler=()=>{
    setCartIsShown(true);

  }
  const hideCartHandler=()=>{
    setCartIsShown(false)
  }
  return (
    <CartProvider>
    {cartIsShown && <Cart onClose={hideCartHandler}></Cart>}
    <Header onShowCart={showCartHandler}></Header>
    <main>
      <Meals />
      
    </main>
    </CartProvider>
  );
}

export default App;
