const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`,
      },
      {
        source: '/',
        destination: '/user',
      },
    ]
  },
}

module.exports = nextConfig
