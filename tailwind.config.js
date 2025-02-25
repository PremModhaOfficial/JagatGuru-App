/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'media',
    content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                primary: '#11ce00',
            },
            fontFamily: {
                jb: ['JetBrainsMonoNFM-Regular', 'monospaced'],
                jbb: ['JetBrainsMonoNerdFontMono-Bold', 'monospaced'],
                jbbi: ['JetBrainsMonoNerdFontMono-BoldItalic', 'monospaced'],
                jbi: ['JetBrainsMonoNerdFontMono-Italic', 'monospaced'],
                lb: ['LibreBarcode39Extended-Regular', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
