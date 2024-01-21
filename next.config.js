/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: 'https://api.steppingstonesapp.com/:path*',
  //     },
  //   ]
  // },
  eslint: {
    dirs: ['pages', 'utils', 'components'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ],
  },
}
