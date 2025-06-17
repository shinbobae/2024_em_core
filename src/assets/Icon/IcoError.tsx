import type { SVGProps } from 'react';
const SvgIcoError = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" {...props}>
    <circle cx={16} cy={16} r={10} fill="#DD5257" />
    <path
      fill="#fff"
      d="M15.714 18a.87.87 0 0 1-.615-.24 1 1 0 0 1-.27-.615l-.3-5.79a.8.8 0 0 1 .225-.6.77.77 0 0 1 .585-.255h1.35q.345 0 .585.255.255.255.225.6l-.285 5.79a.87.87 0 0 1-.285.615.87.87 0 0 1-.615.24zm.75 1.2q.345 0 .6.255t.255.6v.54q0 .345-.255.6a.82.82 0 0 1-.6.255h-.9a.82.82 0 0 1-.6-.255.82.82 0 0 1-.255-.6v-.54q0-.345.255-.6t.6-.255z"
    />
  </svg>
);
export default SvgIcoError;
