/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/*/**',
            },
            {
                protocol: 'https',
                hostname: 'mbwxgztbfdbpxfasqygv.supabase.co',
                port: '',
                pathname: '/*/**',
            },
        ],
    },
    webpack: (config, { webpack }) => {
        config.plugins.push(new webpack.IgnorePlugin({
            resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
        }))

        return config
    },

}

module.exports = nextConfig