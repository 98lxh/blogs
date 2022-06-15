/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: { ignoreDuringBuilds: true },
}

const removeImports = require('next-remove-imports')()

module.exports = removeImports(nextConfig)
