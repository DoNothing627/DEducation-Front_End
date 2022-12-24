/** @type {import('next').NextConfig} */
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { useBundleAnalyzer } = process.env;
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["1.bp.blogspot.com"],
  },
  // sassOptions: {
  //     includePaths: [path.join(__dirname, 'styles')],
  // },

  webpack(config) {
    // From https://nanxiaobei.medium.com/disable-css-modules-in-next-js-project-756835172b6e
    // remove css module
    // Find and remove NextJS css rules.
    // for next@12, try `config.module.rules[2]...`
    config.module.rules?.[3].oneOf?.forEach((one) => {
      if (!`${one.issuer?.and}`.includes("_app")) return;
      one.issuer.and = [path.resolve(__dirname)];
    });

    return config;
  },
};

module.exports = nextConfig;
