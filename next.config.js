/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
        asyncWebAssembly: true,
    buildHttp: true,
    layers: true,
    };
    return config;
  },
};
module.exports = nextConfig;