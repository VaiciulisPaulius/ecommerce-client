const fs = require('fs');
const path = require('path');
const sitemap = require('sitemap');

const baseUrl = 'http://localhost:5173';

const urls = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/login', changefreq: 'weekly', priority: 0.7 },
    { url: '/register', changefreq: 'weekly', priority: 0.7 },
    { url: '/products', changefreq: 'daily', priority: 0.9 },
    { url: '/products/:id', changefreq: 'weekly', priority: 0.8 },
    { url: '/cart', changefreq: 'weekly', priority: 0.6 },
    { url: '/profile', changefreq: 'weekly', priority: 0.7 },
    { url: '/orders', changefreq: 'monthly', priority: 0.5 },
];

// Generate the sitemap
const sitemapXML = sitemap.createSitemap({
    hostname: baseUrl,
    cacheTime: 600000,
    urls: urls,
});

// Write the generated sitemap to a file (typically "public" or a directory accessible by the server)
fs.writeFileSync(path.resolve(__dirname, 'public', 'sitemap.xml'), sitemapXML.toString());

console.log('Sitemap has been generated successfully!');
