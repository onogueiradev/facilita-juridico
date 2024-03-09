/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => {
    return process.env.GIT_HASH || 'default-build-id';
  },
};

export default nextConfig;
