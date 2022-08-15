import React,{useContext,useEffect,useState} from 'react';
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../Store/Cart-Context";
function HeaderCartButton(props) {
  
  const [btnAnimation,setBtnAnimation]=useState(false)
  const cartCtx =useContext(CartContext)
  const {items}=cartCtx
  const numberOfCartItems=items.reduce((curNum,item)=>{
    return curNum+item.amount
  },0)
  
  const btnClasses=`${classes.button} ${btnAnimation? classes.bump:''}`

  useEffect(() => {
    if (items.length===0){
      return;
    }
    setBtnAnimation(true)

    const timer=setTimeout(()=>{
      setBtnAnimation(false)
    },300)

    return()=>{
      clearTimeout(timer);
    }
  }, [items])
  
  return (
    
    <>
    <button className={btnClasses} onClick={props.onClick}> 
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
    </>
  )
}

export default HeaderCartButton