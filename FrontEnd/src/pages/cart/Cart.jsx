import React, { useEffect } from "react";
import "./cart.scss";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";

const Cart = () => {
 

 const{getCartItems,cartItems,updateQuantity,deleteFromCart,total,subtotal}=useCartStore()
 
   useEffect(()=>{
   
     getCartItems()
      },[]) 
 
 

  return (
    <section className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <p>{cartItems.length} items</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">🛒 Your cart is empty</div>
      ) : (
        <div className="cart-grid">
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <div className="quantity">
                    <button><Minus size={16} onClick={()=>updateQuantity(item.id,item.quantity-1)}/></button>
                    <span>{item.quantity}</span>
                    <button><Plus size={16} onClick={()=>updateQuantity(item.id,item.quantity+1)}/></button>
                  </div>
                </div>
                <button className="delete-btn" onClick={() => deleteFromCart(item.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹20</span>
            </div>
            <hr />
            <div className="summary-total">
              <span>Total</span>
              <span>₹{total }</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
