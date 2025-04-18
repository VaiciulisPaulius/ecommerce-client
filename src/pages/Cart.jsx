import React, { useState, useEffect } from 'react';
import { Link } from "react-router";
import { useAuth } from "/src/contexts/AuthContext.jsx";
import {useJsonApi} from "../contexts/JsonApiContext.jsx";
import { API_ROUTES } from "../utils/apiRoutes/ApiRoutes.js";
import {useCart} from "../contexts/CartContext.jsx";

function Cart() {
    const auth = useAuth();
    const user = auth.user;
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { request } = useJsonApi();
    const { fetchCartQuantity } = useCart();

    // Fetch cart items
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                if (user) {
                    const response = await request("GET", API_ROUTES.CART.PRODUCTS, null, user); // Adjust API call as needed
                    const items = response;
                    console.log(response)
                    setCartItems(items);
                    calculateTotalPrice(items); // Recalculate total price when cart data changes
                }
            } catch (error) {
                console.error("Failed to fetch cart items:", error);
            }
        };

        if (user) {
            fetchCartItems();
        }
    }, [user]);

    // Calculate the total price of all cart items
    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => {
            return acc + parseInt(item.cartItem.quantity) * parseInt(item.product.price)
        }, 0);
        setTotalPrice(total);
    };

    // Update item quantity
    const updateQuantity = async (productId, cartId, newQuantity) => {
        console.log({ productId: productId, quantity: newQuantity })
        try {
            const response = await request("PUT", API_ROUTES.CART.BASE, { productId: productId, quantity: newQuantity }, user);

            const updatedItems = cartItems.map(item =>
                item.cartItem.cartId === cartId
                    ? {
                        ...item,
                        cartItem: {
                            ...item.cartItem,
                            quantity: newQuantity
                        }
                    }
                    : item
            );
            fetchCartQuantity()
            setCartItems(updatedItems);
            calculateTotalPrice(updatedItems);
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    };

    // Delete cart item
    const deleteItem = async productId => {
        try {
            const response = await request("DELETE", API_ROUTES.CART.BASE + `/${productId}`, null, user);

            const updatedItems = cartItems.filter(item => item.product.id !== productId);
            setCartItems(updatedItems);
            calculateTotalPrice(updatedItems);

        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    const handleOrder = async () => {
        try {
            const response = await request("POST", API_ROUTES.ORDERS.FROM_CART, null, user);
            if (response.success) {
                setCartItems([]);
                setTotalPrice(0);
                fetchCartQuantity();
            } else {
                console.error("Order failed:", response.error);
            }
        } catch (error) {
            console.error("Failed to place order:", error);
        }
    };


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {/* Cart Items List */}
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.cartItem.cartId} className="flex items-center justify-between p-4 border-b">
                                <img
                                    src={API_ROUTES.API_IP + item.imageUrl || "https://via.placeholder.com/100x100?text=No+Image"}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover"
                                />
                                <div className="flex-1 ml-4">
                                    <h2 className="text-xl font-semibold">{item.product.name}</h2>
                                    <p className="text-sm text-gray-600">Unit Price: ${parseInt(item.product.price).toFixed(2)}</p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="px-2 py-1 bg-blue-500 text-white rounded"
                                        onClick={() => updateQuantity(item.product.id, item.cartItem.cartId, parseInt(item.cartItem.quantity) - 1)}
                                        disabled={item.cartItem.quantity <= 1}
                                    >-</button>
                                    <span>{item.cartItem.quantity}</span>
                                    <button
                                        className="px-2 py-1 bg-blue-500 text-white rounded"
                                        onClick={() => updateQuantity(item.product.id, item.cartItem.cartId, parseInt(item.cartItem.quantity) + 1)}
                                    >+</button>
                                </div>

                                {/* Item Total */}
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold text-lg">${(parseInt(item.cartItem.quantity) * parseInt(item.product.price)).toFixed(2)}</span>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => deleteItem(item.product.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="mt-6 flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Total Price: ${totalPrice.toFixed(2)}</h2>
                        <button
                            className="bg-green-500 text-white px-6 py-2 rounded"
                            onClick={handleOrder}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
