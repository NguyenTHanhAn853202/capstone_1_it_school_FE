/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {},
        colors: {
            white: '#ffffff',
            black: '#000000',
            light: '#f5f6f7',
            dark: '#212529',
            red: '#dc2626',
            button: '#73A2E0',
            input: '#e5e7eb',
            button_green: '#5FB5B8',
            mark: 'rgba(209,213,219,0.5)',
            ip_dark: '#D9D9D9',
        },
        spacing: {
            sm: '8px',
            md: '12px',
            lg: '16px',
            xl: '24px',
            container: '90%',
            1: '8px',
            2: '12px',
            3: '16px',
            4: '24px',
            5: '32px',
            6: '48px',
        },
        fontSize: {
            normal: '1.6rem',
        },
    },
    plugins: [],
};
