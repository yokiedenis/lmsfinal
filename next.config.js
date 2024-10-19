/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ["utfs.io"] // Add your domain names here
    },
    eslint:{
        ignoreDuringBuilds:true,
    },
    middleware: ["middleware.ts"],
};

module.exports = nextConfig;
 
