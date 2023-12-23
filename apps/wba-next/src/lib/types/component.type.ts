import { ComponentProps, JSXElementConstructor, ReactNode } from "react";

export type HeadlessComponentProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
> = {
  children?: ReactNode;
} & ComponentProps<T>;
