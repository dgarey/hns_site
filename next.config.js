/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
        asyncWebAssembly: true,
    buildHttp: {
      allowedUris: [
      'http://2c5d337bff253fbacc5a94d5a6058d84009c751cfbc134c620546335.dagwell',
      ],
        },
    layers: true,
    };
    return config;
  },
};
module.exports = nextConfig;
