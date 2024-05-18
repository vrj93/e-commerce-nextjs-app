/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        domains: ['e-commerce-nestjs-images.s3.amazonaws.com'],
        deviceSizes: [640, 750, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96],
    },
};

export default nextConfig;
