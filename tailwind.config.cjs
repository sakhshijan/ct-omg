/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            screens: {
                'xs': '365px',
                xd: '430px'
            },
            fontFamily: {
                'nato-sans-arabic': ['Noto Sans Arabic', 'sans-serif'],
                'kalameh': ['KalamehWebFaNum', 'sans-serif']
            },
            colors: {
                primary: '#ff6600',
                'ct-club-primary': '#FFA61E'
            }
        },
    },
    plugins: [],
}
