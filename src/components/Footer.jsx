// Footer.jsx
import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Apie mus</h3>
                        <p className="text-sm text-gray-400">LTech - Jūsų patikimas technologijų partneris. Parduodame naujausią elektroniką už geriausias kainas Lietuvoje.</p>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Kontaktai</h3>
                        <ul>
                            <li className="text-sm text-gray-400">Tel: +370 600 12345</li>
                            <li className="text-sm text-gray-400">El. paštas: info@ltech.lt</li>
                            <li className="text-sm text-gray-400">Adresas: Vilniaus g. 12, Vilnius, Lietuva</li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Sekite mus</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <i className="fab fa-twitter"></i>
                            </a>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Naujienlaiškis</h3>
                        <p className="text-sm text-gray-400 mb-4">Užsiprenumeruokite mūsų naujienlaiškį ir gaukite naujienas apie akcijas ir naujus produktus.</p>
                        <input
                            type="email"
                            placeholder="Įveskite savo el. paštą"
                            className="px-4 py-2 w-full rounded-l-md border-t border-b border-l border-gray-300"
                        />
                        <button className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                            Prenumeruoti
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-center py-4 text-gray-400">
                <p>&copy; {new Date().getFullYear()} LTech. Visos teisės saugomos.</p>
            </div>
        </footer>
    );
}

export default Footer;
