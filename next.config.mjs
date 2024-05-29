/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = {
          "mongodb-client-encryption": false ,
          "aws4": false
        };
    
        return config;
      },
        reactStrictMode: true,
        images: {
          // domains: ['res.cloudinary.com', '*.googleusercontent.com'], 
          remotePatterns: [
            {
              protocol: "https",
              hostname: "*.googleusercontent.com",
              port: "",
              pathname: "**",
            },
            {
              protocol: "https",
              hostname: "res.cloudinary.com",
              port: "",
              pathname: "**",
            },
            {
              protocol: "https",
              hostname: "utfs.io",
              port: "",
              pathname: "**",
            },
          ],
        },
};

export default nextConfig;
