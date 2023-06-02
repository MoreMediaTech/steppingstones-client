/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: { esmExternals: true, appDir: false },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5001/api/:path*',
      },
    ]
  },
  eslint: {
    dirs: ['pages', 'utils', 'components'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}
