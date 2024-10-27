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
            red: '#FD4040',
            button: '#73A2E0',
            input: '#e5e7eb',
            button_green: '#5FB5B8',
            mark: 'rgba(209,213,219,0.5)',
            ip_dark: '#EEF0F1',
            side_bar: '#F2F5F8',
            gold: '#DFB300',
            silver: '#ABABAB',
            border: '#868686',
            container: '#F2F5F8',
            shadow: '#969595',
            
        },
        spacing: {
            sm: '8px',
            md: '12px',
            lg: '16px',
            xl: '24px',
            container: '96%',
            0: '0px',
            1: '8px',
            2: '12px',
            3: '16px',
            4: '24px',
            5: '32px',
            6: '48px',

            side_bar: '17%',
            header: '83%',
        },
        fontSize: {
            normal: '1.6rem',
            14: '1.4rem',
            12: '1.2rem',
            10: '1rem',
        },
        screens: {
            sm: '640px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            xl: '1280px',
            // => @media (min-width: 1280px) { ... }
            '1xl': '1430px',
            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
    },
    plugins: [],
};
