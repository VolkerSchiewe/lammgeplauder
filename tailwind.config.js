const colors = require('tailwindcss/colors')
module.exports = {
    content: [
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                orange: colors.orange
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
