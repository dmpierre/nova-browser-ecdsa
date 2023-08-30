module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  async headers() {
    return [
      {
        source: '/(.*?)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          }
        ],
      },
    ]
  }
};
