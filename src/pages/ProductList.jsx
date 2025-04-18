import React, { useEffect, useState } from 'react';
import {useLocation, useNavigate, useParams} from "react-router";
import ProductCard from "/src/components/ProductCard.jsx"; // You'll need to make this
import { useProfile } from "/src/contexts/ProfileContext.jsx";
import {useJsonApi} from "/src/contexts/JsonApiContext.jsx";
import { API_ROUTES } from "/src/utils/apiRoutes/ApiRoutes.js";
import {useAuth} from "../contexts/AuthContext.jsx";

function ProductList() {
    const { request } = useJsonApi();
    const { user } = useAuth();
    const { getAllProductFavourites } = useProfile(); // Optional: if you plan to support "favourites"
    const [products, setProducts] = useState([]);

    // Use location to access the query params
    const location = useLocation();

    // Get page from query params (default to 1)
    const page = new URLSearchParams(location.search).get('page') || 1;


    const [limit, setLimit] = useState(5);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    const calculateSkip = () => {
        if (page < 0) return 0;
        return (limit * page) - limit;
    }

    const goToPage = targetPage => {
        navigate("/products/" + targetPage);
    }

    useEffect(() => {
        async function fetchProducts() {
            const res = await request("GET", API_ROUTES.PRODUCTS.GET_ALL, null, user);
            console.log(res)// crude fallback

            if (Array.isArray(res)) {
                setProducts(res);
                setTotal(res.length);
            }
        }

        fetchProducts();
        console.log(page)
    }, [page]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            {products.length > 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl flex flex-col gap-4">
                    <h2 className="text-2xl font-bold mb-6 text-center">Product List</h2>
                    {products.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                    <div className="flex justify-center items-center gap-2 mt-4">
                        <button onClick={() => goToPage(page - 1)} disabled={page === 1}
                                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">
                            Prev
                        </button>
                        <span className="text-lg font-medium">Page {page} of {Math.ceil(total / limit)}</span>
                        <button onClick={() => goToPage(page + 1)} disabled={page === Math.ceil(total / limit)}
                                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProductList;
