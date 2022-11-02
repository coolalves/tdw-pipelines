/** @type {import('next').NextConfig} */
module.exports = {

    async rewrites() {
        return [{
            source: "/:slug*.html", // Old url with .html
            destination: "/:slug*", // Redirect without .html
        }, ];
    },

    reactStrictMode: true,
    swcMinify: true,
    images: {
        unoptimized: true,
    },
    assetPrefix: "/",
};