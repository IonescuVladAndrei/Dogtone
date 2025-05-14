import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {

  /* Brand */
  --color-brand-0: #fff;
  --color-brand-25: #f6fcff;
  --color-brand-50: #e9eff2;
  --color-brand-100: #bdced9;
  --color-brand-200: #91aec0;
  --color-brand-300: #648da6;
  --color-brand-400: #386c8d;
  --color-brand-500: #225c80;
  --color-brand-600: #1b4a66;
  --color-brand-700: #14374d;
  --color-brand-800: #0e2533;
  --color-brand-900: #07121a;

  
  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #EFEFEF;
  --color-grey-150: #e0e1e2;
  --color-grey-200: #d6d6d6;
  --color-grey-300: #adadad;
  --color-grey-400: #707070;
  --color-grey-500: #474747;
  --color-grey-600: #333333;
  --color-grey-700: #292929;
  --color-grey-800: #1f1f1f;
  --color-grey-900: #141414;

  /* Red */
  --color-red-100: #fee2e2;
  --color-red-600: #c03333;
  --color-red-700: #b91c1c;
  --color-red-750: #a71919;
  --color-red-800: #991b1b;

  /* Green */
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-green-500: #228b22; 
  --color-green-200: #449964;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.24);
  --shadow-md: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  --shadow-lg: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px, rgba(0, 0, 0, 0.35) 0px 5px 15px;
  
  --border-radius-tiny: 4px;
  --border-radius-sm: 6px;
  --border-radius-md: 8px;
  --border-radius-lg: 10px;
  

  ::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar-track {
		background: var(--color-brand-700);
		border-radius: 10px;
	}

	::-webkit-scrollbar-thumb {
		background: var(--color-brand-300);
		border-radius: 10px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: var(--color-brand-300);
	}

	* {
		scrollbar-width: thin;
		scrollbar-color: var(--color-brand-300) var(--color-brand-700);
	}
}
html {
  font-size: 62.5%;
}

body {
  font-family: "Rubik", "Roboto Flex", sans-serif, system-ui, -apple-system, 'Segoe UI', Arial;
  color: var(--color-grey-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

button {
  cursor: pointer;
  font-family: "Rubik", "Roboto Flex", sans-serif, system-ui, -apple-system, 'Segoe UI', Arial;
}

input{
  font-family: "Rubik", "Roboto Flex", sans-serif, system-ui, -apple-system, 'Segoe UI', Arial;
}

textarea{
  font-family: "Rubik", "Roboto Flex", sans-serif, system-ui, -apple-system, 'Segoe UI', Arial;
}

*:disabled {
  cursor: not-allowed;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

img {
  max-width: 100%;
}
    
`;

export default GlobalStyles;
