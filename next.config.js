/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
        asyncWebAssembly: true,
    buildHttp: {
      allowedUris: [
      'http://969169ef2a833a.dagwell/',
        'http://wallet.dagwell',
        ],
        },
    layers: true,
    };
    return config;
  },
};
module.exports = nextConfig;
