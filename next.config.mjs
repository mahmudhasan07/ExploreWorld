/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {

        remotePatterns: [
            {
                protocol: 'https',
                unoptimized: true,
            }
        ]
    },
};

export default nextConfig;
