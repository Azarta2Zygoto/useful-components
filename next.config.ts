import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export', // Generates static HTML/CSS/JS files
    images: {
        unoptimized: true, // Required for static export
    },
    basePath: '/useful-components', // Base path for the static export
    assetPrefix: '/useful-components/',
};

export default nextConfig;
