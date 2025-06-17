declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const content: any;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  export default content;
}