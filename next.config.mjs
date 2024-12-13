/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'placehold.co',
            pathname: '/**',
            port: '',
            search: '',
          },
          {
            protocol: 'https',
            hostname: 'img.spoonacular.com',
            pathname: '/recipes/**',
            port: '',
            search: '',
          },
        ],
        
      },
};

export default nextConfig;
