/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        //  remotePatterns:[
        //     {
        //         hostname: 'i.ibb.co',
        //      }
        //  ]
        unoptimized : true
    },
    // output: 'export',
    // experimental: {
    //     serverActions: true,
    // },
    env : {
        poolID : 'us-east-1_XkU6MHRiM',
        client : '3tidmbuitqh027a61iidcbqseg'
    }
};

export default nextConfig;
