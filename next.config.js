/** @type {import('next').NextConfig} */
const nextConfig = {images: {unoptimized: true},output: 'export',
webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          // fixes proxy-agent dependencies
          net: false,
          dns: false,
          tls: false,
          fs:false,
          assert: false,
          // fixes sentry dependencies
          process: false
        }
      };
    }
    return config;
  },
  sentry: {
    hideSourceMaps: true
  }
}

module.exports = nextConfig
