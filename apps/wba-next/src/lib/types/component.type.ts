import { ComponentProps, JSXElementConstructor, ReactNode } from "react";

export type HeadlessComponentProps<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
> = {
  children?: ReactNode;
} & ComponentProps<T>;
