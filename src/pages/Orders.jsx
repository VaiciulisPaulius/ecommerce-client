import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { API_ROUTES } from "/src/utils/apiRoutes/ApiRoutes.js";
import useApiClient from "../hooks/UseApiClient.jsx";
import {useJsonApi} from "../contexts/JsonApiContext.jsx";
import {Helmet} from "react-helmet";

function Orders() {
    const { user } = useAuth();
    const { request } = useJsonApi()
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await request("GET", API_ROUTES.ORDERS.BASE, null, user);
                const ordersWithProducts = await Promise.all(
                    response.map(async (order) => {
                        const itemsWithProduct = await Promise.all(
                            order.items.map(async (item) => {
                                const product = await request("GET", `${API_ROUTES.PRODUCTS.BASE}/${item.productId}`, null, user);
                                return { ...item, product };
                            })
                        );
                        return { ...order, items: itemsWithProduct };
                    })
                );
                console.log(ordersWithProducts)
                setOrders(ordersWithProducts);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    return (
        <>
            <Helmet>
                <title>Užsakymai – LTech</title>
                <meta name="description" content="Peržiūrėkite savo ankstesnius užsakymus ir jų būseną elektroninėje LTech parduotuvėje." />
            </Helmet>
            <div className="container mx-auto p-6 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Jūsų užsakymai</h1>
                {orders.length === 0 ? (
                    <p>Nėra užsakymų.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.orderId} className="mb-8 p-4 border rounded shadow">
                            <h2 className="text-xl font-semibold mb-2">
                                Užsakymas #{order.orderId} - {new Date(order.createdAt).toLocaleDateString()}
                            </h2>
                            <p className="text-gray-600 mb-4">Status: {order.status}</p>
                            <div className="space-y-2">
                                {order.items.map((item) => (
                                    <div key={`${item.orderId}-${item.productId}`} className="flex justify-between items-center p-2 border-b">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={API_ROUTES.API_IP + item.product.imageUrl}
                                                alt={item.product.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div>
                                                <p className="font-semibold">{item.product.name}</p>
                                                <p className="text-sm text-gray-600">Vnt. Kaina: ${parseInt(item.product.price).toFixed(2)}</p>
                                                <p className="text-sm text-gray-600">Kiekis: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="font-bold text-lg">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-right mt-4 font-semibold text-xl">
                                Galutinė kaina: ${order.totalPrice.toFixed(2)}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Orders;