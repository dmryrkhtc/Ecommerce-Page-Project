import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, removeItem, increaseQuantity, decreaseQuantity, clearCart } = useContext(CartContext);




    const totalWithoutTaxAndShipping = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = totalWithoutTaxAndShipping * 0.18;
    const shipping = 2212;

    const totalAmount = (totalWithoutTaxAndShipping + tax + shipping).toFixed(2);

    if (cart.length === 0) {
        return (
            <div className="empty-cart">
                <h1>Your Cart is Empty</h1>
                <p>It looks like you haven't added any items to your cart yet.</p>
                <p>Browse our products and add your favorites to your cart.</p>
                <Link to="/product-list" className="browse-button">Browse Products</Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1>Your Shopping Cart</h1>
            <ul className="cart-list">
                {cart.map(item => (
                    <li key={item.id} className="cart-item">
                        <img
                            src={item._links?.thumbnail?.href.replace("{image_version}", "small") || "https://via.placeholder.com/150"}
                            alt={item.title || "No title available"}
                            className="cart-item-image"
                        />
                        <div className="cart-item-details">
                            <h2>{item.title}</h2>
                            <p>{item.description || "No description available"}</p>
                            <p className="item-price">{item.price ? `${item.price} TL` : "Price Unknown"}</p>
                            <div className="cart-item-controls">
                                <button onClick={() => decreaseQuantity(item.id)} className="quantity-button">-</button>
                                <span className="quantity">{item.quantity}</span>
                                <button onClick={() => increaseQuantity(item.id)} className="quantity-button">+</button>
                                <button onClick={() => removeItem(item.id)} className="remove-button">Remove</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="cart-summary">


                <button onClick={clearCart} className="clear-cart-button">Clear Cart</button>
                <div className="total-price">
                    <h3>Subtotal:</h3>
                    <p>{totalWithoutTaxAndShipping.toFixed(2)} $</p>

                    <h3>Tax (18%):</h3>
                    <p>{tax.toFixed(2)} $ </p>
                    <h3>Shipping:</h3>
                    <p>{shipping.toFixed(2)} $</p>
                    <h3>Total:</h3>
                    <p>{totalAmount} $</p>
                </div>
                <Link to="/checkout" className="checkout-button">Proceed to Checkout</Link>
            </div>
        </div>
    );
};

export default Cart;





