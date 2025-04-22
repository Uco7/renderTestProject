const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const sitemap = new SitemapStream({ hostname: 'https://yourdomain.com' });
const writeStream = createWriteStream('./public/sitemap.xml');

sitemap.pipe(writeStream);

sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.8 });
// Add other pages here

sitemap.end();
