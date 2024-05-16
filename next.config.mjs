/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        domains: ['e-commerce-nestjs-images.s3.amazonaws.com'],
    },
};

export default nextConfig;
