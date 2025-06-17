import { black, blue, green, red, yellow } from '../../colors';

export const success = green;
export const danger = red;
export const warning = yellow;
export const info = blue;
export const gray = black;
export const primary = info;
export const secondary = success;

export const palette = {
  success: green[500],
  danger: red[500],
  warning: yellow[500],
  info: blue[500],
  black: black[900],
  primary: blue[500],
  secondary,
} as const;
