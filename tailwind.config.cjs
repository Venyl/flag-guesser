/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'primary-900': '#13141b',
                'primary-800': '#21222e',
            },
            gridTemplateColumns: {
                auto: 'repeat(auto-fit, minmax(20rem, 1fr))',
            },
            scale: {
                emphasize: '1.048',
            },
        },
    },
    plugins: [],
};
