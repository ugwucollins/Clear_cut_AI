import type { ReactElement } from "react";

export type ButtonProps = {
  title: string;
  icon?: ReactElement;
  loading?: boolean;
  color?: string;
  className?: string;
  onClick?: () => void;
};

export type InputProps = {
  value: any;
  label: string;
  type: string;
  error: string | any;
  className?: string;
  placeholder: string;
};

export type ModalProp = {
  Title: string;
  OkayBtn: string;
  CancelBtn: string;
  Icon?: ReactElement;
  Progress: () => void;
  Cancel: () => void;
};

export type DashCardProp = {
  title: string;
  number: string | number;
  icon?: ReactElement;
  path?: string;
};

export type AccountProp = {
  title: string;
  type?: string;
};
export type PriceCardProps = {
  list: string[];
  topTitle: string;
  plan: string;
  title: string;
  message: string;
  className?: string;
  amount: string;
  value?: string | number;
  ani?: boolean;
  path?: string;
  btnText: string;
  id?: string | any;
  onclick?: () => void;
};

export type TextAreaProps = {
  value: any;
  label: string;
  error: string | any;
  className?: string;
  placeholder: string;
};
