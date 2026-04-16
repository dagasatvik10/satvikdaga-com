/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: '#e2e2f0',
        secondary: '#0000ee',
        accent: '#1a1a2e',
        background: '#1a1a2e',
        foreground: '#e2e2f0'
    },
    fontFamily: {
        sans: [
            'JetBrains Mono',
            'sans-serif'
        ],
        mono: [
            'monospace',
            'sans-serif'
        ]
    },
    fontSize: {
        '18': [
            '18px',
            {
                lineHeight: 'normal'
            }
        ],
        '27': [
            '27px',
            {
                lineHeight: 'normal'
            }
        ],
        '36': [
            '36px',
            {
                lineHeight: 'normal'
            }
        ],
        '21.06': [
            '21.06px',
            {
                lineHeight: 'normal'
            }
        ],
        '16.2': [
            '16.2px',
            {
                lineHeight: 'normal'
            }
        ],
        '15.3': [
            '15.3px',
            {
                lineHeight: 'normal',
                letterSpacing: '0.5px'
            }
        ],
        '14.4': [
            '14.4px',
            {
                lineHeight: 'normal'
            }
        ],
        '9.9': [
            '9.9px',
            {
                lineHeight: '10.89px',
                letterSpacing: '1px'
            }
        ],
        '5.04': [
            '5.04px',
            {
                lineHeight: '5.292px'
            }
        ]
    },
    spacing: {
        '2': '4px',
        '4': '8px',
        '6': '12px',
        '8': '16px',
        '10': '20px',
        '12': '24px',
        '14': '28px',
        '16': '32px',
        '20': '40px'
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        full: '50px'
    },
    boxShadow: {
        xl: 'rgba(0, 0, 0, 0.5) 0px 25px 80px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px'
    }
},
  },
};
