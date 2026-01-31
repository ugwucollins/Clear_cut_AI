import type { ReactElement, ReactNode } from "react";

export type ButtonProps = {
  title: string;
  icon?: ReactElement;
  loading?: boolean;
  color?: string;
  className?: string;
  onClick?: () => void;
};
export type MenuProps = {
  title: string;
  path?: string;
};
export type TextAnimationProps = {
  title: string;
  className?: string;
  direction: number;
  duration: number;
};
export type SliderAnimationProps = {
  dis: number;
  dur: number;
  del: number;
};
export type DivSliderProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};
export type SocialMediaProps = {
  icon: ReactElement;
  path?: string;
};
export type ContainerProps = {
  children: ReactNode;
  className?: string;
};
export type KeyCardProps = {
  icon: ReactElement;
  title: string;
  message: string;
  className?: string;
  ani?: boolean;
};
export type PriceCardProps = {
  list: string[];
  topTitle: string;
  title: string;
  message: string;
  className?: string;
  amount: string;
  value?: string | number;
  ani?: boolean;
  path?: string;
  btn: string;
};

export type WorksCardProps = {
  number: number;
  title: string;
  message: string;
  className?: string;
};
export type SocialIconsProps = {
  icons: ReactElement;
  path?: string;
};
export type AccountProp = {
  title: string;
  type?: string;
};
export type ContactCardProps = {
  icon: ReactElement;
  title: string;
  message: string;
  sMessage?: string;
  action?: boolean;
  className?: string;
};
export type TestimonialsProps = {
  icon: ReactElement;
  name: string;
  ani?: boolean;
  role: string;
  message: string;
  className?: string;
};
export type InputProps = {
  value: any;
  label: string;
  type: string;
  error: string | any;
  className?: string;
  placeholder: string;
};
export type TextAreaProps = {
  value: any;
  label: string;
  error: string | any;
  className?: string;
  placeholder: string;
};

export type FooterProps = {
  title: string;
  handlePaths: {
    title: string;
    path?: string;
  }[];
};
