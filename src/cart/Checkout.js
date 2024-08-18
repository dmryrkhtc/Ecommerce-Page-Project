import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import './Checkout.css';

const Checkout = () => {
    const { cart, totalAmount, clearCart } = useContext(CartContext);
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [error, setError] = useState('');

    const handlePlaceOrder = () => {
        if (!fullName || !address || !phone || !country || !city || !postalCode) {
            setError('Please fill in all fields.');
            return;
        }
       
        alert('The order has been placed successfully!');
        clearCart(); 
    };

    return (
        <div className="checkout-page">
            <h1>Payment</h1>
            <div className="checkout-section">
                <h2>Personal Information</h2>
                <form>
                    <label>
                        Name-Surname:
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Address:
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Country:
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Postal Code:
                        <input
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                        />
                    </label>
                </form>
            </div>
            <div className="checkout-section">
                <h2>Payment Information</h2>
                <label>
                    Payment Method:
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="Credit Card">Credit Cart</option>
                        <option value="Bank Card">Bank Card</option>
                        <option value="PayPal">PayPal</option>
                    </select>
                </label>
            </div>
            <div className="checkout-summary">
                <h2>Checkout Summary</h2>
                <ul className="checkout-list">
                    {cart.map(item => (
                        <li key={item.id} className="checkout-item">
                            <img
                                src={item._links?.thumbnail?.href.replace("{image_version}", "small") || "https://via.placeholder.com/100"}
                                alt={item.title || "No Title"}
                                className="checkout-item-image"
                            />
                            <div className="checkout-item-details">
                                <h3>{item.title}</h3>
                                <p>{item.description || "No Description"}</p>
                                <p className="item-price">{item.price ? `${item.price} TL` : "Price Unknown"}</p>
                                <p className="item-quantity">Quantity: {item.quantity}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="total-price">
                    <h3>Total:</h3>
                    <p>{totalAmount.toFixed(2)} TL</p>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button onClick={handlePlaceOrder} className="place-order-button">Place the Order</button>
            </div>
        </div>
    );
};

export default Checkout;

