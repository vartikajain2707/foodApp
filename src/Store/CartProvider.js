import React,{useReducer} from 'react'
import CartContext from './Cart-Context'

const defaultCartState={
  items:[],
  totalAmount:0
}
const CartReducer=(state,action)=>{
  if(action.type==='ADD'){
    
    const updatedTotalAmount=state.totalAmount+action.item.price*action.item.amount;
    const existingItemIndex=state.items.findIndex(item=>item.id===action.item.id);
    const existingCartItem=state.items[existingItemIndex];
    
    let updatedItems;

    if(existingCartItem){
      const updatedItem={
        ...existingCartItem,
        amount:existingCartItem.amount+action.item.amount
      };
      updatedItems=[...state.items];
      updatedItems[existingItemIndex]=updatedItem
    }
    else{
      
      updatedItems=state.items.concat(action.item);
    }
    
     
    return {
      items:updatedItems,
      totalAmount:updatedTotalAmount
    }
  }
  if(action.type==='REMOVE'){
    
    const  existingCartItem=state.items.findIndex((item)=>
      item.id===action.id
    );
    const existingItem=state.items[existingCartItem]
    const updatedTotalAmount=state.totalAmount-existingItem.price
    let updatedItems;
    if(existingItem.amount===1){
      updatedItems=state.items.filter(item=>item.id!==action.id);
    }
    else{
      const updatedItem={...existingItem,amount:existingItem.amount-1};
      updatedItems=[...state.items];
      updatedItems[existingCartItem]=updatedItem
    }
    return{
      items:updatedItems,
      totalAmount:updatedTotalAmount
    }
  }
    return defaultCartState
}

function CartProvider(props) {
  const [cartState,dispatchCartAction]=useReducer(CartReducer,defaultCartState)
    const addItemToCartHandler=(item)=>{
      dispatchCartAction({type:'ADD',item:item});
      

    }
    const removeItemToCartHandler=(id)=>{
      dispatchCartAction({type:'REMOVE',id:id})
    }
const cartContext={
    items:cartState.items,
    totalAmount:cartState.totalAmount,
    addItem:addItemToCartHandler,
    removeItem:removeItemToCartHandler
}

  return <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
}

export default CartProvider