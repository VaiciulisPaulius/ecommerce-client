import React from 'react';
import { API_ROUTES } from "../utils/apiRoutes/ApiRoutes.js";
import {useNavigate} from "react-router";

function ProductCard({ product }) {
    const imageUrl = API_ROUTES.API_IP + product.imageUrl || "https://via.placeholder.com/300x200?text=No+Image";
    const navigate = useNavigate();


    return (
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
            <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => navigate("/products/" + product.id)}
            />
            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-700 text-sm line-clamp-2">
                    {product.description || "No description provided."}
                </p>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</span>
                    <span className={`text-sm ${product.stock > 0 ? "text-gray-600" : "text-red-500"}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
