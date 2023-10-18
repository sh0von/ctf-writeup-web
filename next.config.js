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
// next.config.js
module.exports = {
  webpack(config, { isServer }) {
    if (!isServer) {
      // Add the styled-components babel plugin to the client-side
      require('styled-components');
    }

    return config;
  },
};
