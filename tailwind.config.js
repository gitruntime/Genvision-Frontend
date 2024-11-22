/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ["Inter", ...fontFamily.sans]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(210, 15%, 95%)',
  			foreground: 'hsl(220, 15%, 20%)',
  			card: {
  				DEFAULT: 'hsl(210, 15%, 98%)',
  				foreground: 'hsl(220, 15%, 20%)'
  			},
  			popover: {
  				DEFAULT: 'hsl(210, 15%, 98%)',
  				foreground: 'hsl(220, 15%, 20%)'
  			},
  			primary: {
  				DEFAULT: 'hsl(210, 80%, 60%)',
  				foreground: 'hsl(220, 15%, 95%)'
  			},
  			secondary: {
  				DEFAULT: 'hsl(210, 60%, 70%)',
  				foreground: 'hsl(220, 15%, 95%)'
  			},
  			muted: {
  				DEFAULT: '#fff',
  				foreground: 'hsl(220, 15%, 50%)'
  			},
  			accent: {
  				DEFAULT: 'hsl(210, 70%, 75%)',
  				foreground: 'hsl(220, 15%, 95%)'
  			},
  			destructive: {
  				DEFAULT: 'hsl(0, 70%, 50%)',
  				foreground: 'hsl(0, 0%, 100%)'
  			},
  			border: 'hsl(210, 10%, 90%)',
  			input: 'hsl(210, 10%, 90%)',
  			ring: 'hsl(210, 80%, 60%)',
  			chart: {
  				'1': 'hsl(220, 80%, 70%)',
  				'2': 'hsl(200, 80%, 65%)',
  				'3': 'hsl(190, 80%, 60%)',
  				'4': 'hsl(170, 80%, 55%)',
  				'5': 'hsl(160, 80%, 50%)'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
};
