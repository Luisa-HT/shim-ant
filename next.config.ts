import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    // Add images domain if you plan to use external image hosts with Next.js Image component
    // images: {
    //     domains: ['example.com'],
    // },
    async rewrites() {
        return [
            {
                // Proxy API requests to the ASP.NET Core backend during development
                // This assumes your ASP.NET Core backend runs on HTTPS port defined by ASPNETCORE_HTTPS_PORT
                // or HTTP port 5000/5001 if not HTTPS.
                // You might need to adjust the target based on your backend's actual URL.
                source: '/api/:path*',
                destination: `https://shim.welazure.me:443/api/:path*`,
            },
            // Add other backend-related paths if your backend serves them directly
            {
                source: '/_configuration/:path*',
                destination: `https://shim.welazure.me:443/_configuration/:path*`,
            },
            {
                source: '/.well-known/:path*',
                destination: `https://shim.welazure.me:443/.well-known/:path*`,
            },
            {
                source: '/Identity/:path*',
                destination: `https://shim.welazure.me:443/Identity/:path*`,
            },
            {
                source: '/connect/:path*',
                destination: `https://shim.welazure.me:443/connect/:path*`,
            },
            {
                source: '/_framework/:path*',
                destination: `https://shim.welazure.me/_framework/:path*`,
            },
            {
                source: '/_vs/browserLink/:path*',
                destination: `https://shim.welazure.me/_vs/browserLink/:path*`,
            },
            {
                source: '/_host/:path*',
                destination: `https://shim.welazure.me/_host/:path*`,
            },
            {
                source: '/WeatherForecast/:path*', // Example endpoint from default template, remove if not needed
                destination: `https://shim.welazure.me/WeatherForecast/:path*`,
            },
        ];
    },
};

export default nextConfig;
