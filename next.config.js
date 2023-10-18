/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}

module.exports = nextConfig
module.exports = {
  async redirects() {
    return [
      {
        source: '/404',
        destination: '/404', // The default error page path
        permanent: true,
      },
    ];
  },
};
