/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns : [
            {
                protocol: 'https',
            }
        ]
    },
};

export default nextConfig;
