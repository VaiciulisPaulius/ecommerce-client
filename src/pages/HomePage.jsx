import React, { useEffect, useState } from 'react';
import { API_ROUTES } from "/src/utils/apiRoutes/ApiRoutes.js";
import { useJsonApi } from "/src/contexts/JsonApiContext.jsx";
import { useAuth } from "/src/contexts/AuthContext.jsx";
import ProductCard from "/src/components/ProductCard.jsx";
import { Helmet } from "react-helmet";


function HomePage() {
    const { request } = useJsonApi();
    const { user } = useAuth();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const res = await request("GET", API_ROUTES.PRODUCTS.GET_ALL, null, user);
            if (Array.isArray(res)) {
                setProducts(res.slice(0, 6)); // Showcase top 6
            }
        }

        fetchProducts();
    }, []);

    return (
        <>
            <Helmet>
                <title>LTech – Elektroninė technologijų parduotuvė</title>
                <meta name="description" content="Atraskite platų technologijų pasirinkimą: telefonai, kompiuteriai, komponentai ir daugiau. Apsipirkite saugiai su LTech." />
            </Helmet>
            <div className="bg-gray-100 min-h-screen px-4 py-8">
                <section className="bg-white rounded-xl shadow-md p-8 mb-10 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">Sveiki atvykę į <span className="text-blue-600">LTech</span></h1>
                    <p className="text-lg text-gray-600">Moderniausia elektronika, geriausios kainos – tik pas mus.</p>
                    <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Naršyti produktus</button>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Kategorijos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {["Telefonai", "Nešiojamieji kompiuteriai", "Priedai"].map((cat, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg text-center">
                                <h3 className="text-xl font-semibold mb-2">{cat}</h3>
                                <p className="text-gray-600">Raskite naujausias {cat.toLowerCase()} technologijas.</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Populiariausi produktai</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.length > 0 ? (
                            products.map(product => <ProductCard product={product} key={product.id} />)
                        ) : (
                            <p className="text-center col-span-3 text-gray-500">Įkeliama...</p>
                        )}
                    </div>
                </section>

                {/* Promo */}
                <section className="bg-blue-100 rounded-xl p-8 text-center shadow">
                    <h2 className="text-2xl font-bold mb-2 text-blue-800">Išskirtiniai pasiūlymai</h2>
                    <p className="text-gray-700 mb-4">Prisijunkite prie mūsų naujienlaiškio ir gaukite papildomą -10% nuolaidą!</p>
                    <input
                        type="email"
                        placeholder="Įveskite el. paštą"
                        className="px-4 py-2 rounded-l border-t border-b border-l border-gray-300"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700">Prenumeruoti</button>
                </section>
            </div>
        </>
    );
}

export default HomePage;
