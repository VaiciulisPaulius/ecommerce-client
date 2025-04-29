import React, { useEffect, useState } from 'react';
import {useLocation, useNavigate, useParams} from "react-router";
import ProductCard from "/src/components/ProductCard.jsx"; // You'll need to make this
import { useProfile } from "/src/contexts/ProfileContext.jsx";
import {useJsonApi} from "/src/contexts/JsonApiContext.jsx";
import { API_ROUTES } from "/src/utils/apiRoutes/ApiRoutes.js";
import {useAuth} from "../contexts/AuthContext.jsx";
import {Helmet} from "react-helmet";

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
        <>
            <Helmet>
                <title>Produktų sąrašas – Kompiuteriai, telefonai, priedai | LTech</title>
                <meta name="description" content="Peržiūrėkite visus mūsų elektronikos produktus – nuo kompiuterių iki mobiliųjų telefonų ir aksesuarų." />
            </Helmet>
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                {products.length > 0 ? (
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl flex flex-col gap-4">
                        <h2 className="text-2xl font-bold mb-2 text-center">Produktų sąrašas</h2>
                        <p className="text-gray-600 text-center mb-4">
                            Naršykite platų elektronikos produktų pasirinkimą – nuo kompiuterių iki išmaniųjų telefonų
                            bei priedų. Visi mūsų siūlomi įrenginiai yra kruopščiai atrinkti, siekiant užtikrinti aukštą
                            kokybę ir geriausią kainos bei kokybės santykį.
                        </p>

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
                    <p>Kraunama...</p>
                )}
            </div>
        </>
    );
}

export default ProductList;
