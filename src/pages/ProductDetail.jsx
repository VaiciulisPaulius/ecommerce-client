import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { API_ROUTES } from "/src/utils/apiRoutes/ApiRoutes.js"
import {useJsonApi} from "../contexts/JsonApiContext.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";
import {useCart} from "../contexts/CartContext.jsx";
import {Helmet} from "react-helmet";

function ProductDetail() {
    const { id } = useParams();
    const { request } = useJsonApi();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { fetchCartQuantity } = useCart()

    const addToCart = async (productId, quantity) => {
        try {
            const response = await request('POST', API_ROUTES.CART.BASE, {
                productId,
                quantity
            }, user); // Pass token for authentication if needed

            // Handle the response (if any) - for example, show a success message
            console.log('Product added to cart:', response);
            fetchCartQuantity()
            return response;
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    }

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await request("GET", API_ROUTES.PRODUCTS.GET_ONE(id), null, user);
                console.log(res)
                setProduct(res);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Kraunama...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center text-red-500">Produktas nerastas.</div>;

    const imageUrl = product.imageUrl ? API_ROUTES.API_IP + "/uploads" + product.imageUrl : "https://via.placeholder.com/600x400?text=No+Image";

    return (
        <>
            <Helmet>
                <title>{product.name} – LTech</title>
                <meta name="description" content={`Pirkite ${product.name} už geriausią kainą LTech elektroninėje parduotuvėje.`} />
            </Helmet>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <div className="bg-white rounded-lg shadow-md max-w-3xl w-full overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-96 object-cover"
                    />
                    <div className="p-6">
                        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
                        <p className="text-gray-700 mb-4">{product.description || "No description available."}</p>
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-2xl font-bold text-green-600">${product.price}</span>
                            <span className={`text-md ${product.stock > 0 ? "text-gray-600" : "text-red-500"}`}>
                                {product.stock > 0 ? `${product.stock} sandelyje` : "Produkto nėra sandėlyje"}
                            </span>
                        </div>
                        <button
                            disabled={product.stock <= 0}
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                            onClick={() => addToCart(product.id, 1)}
                        >
                            Pridėti į krepšelį
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
