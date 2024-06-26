"use client"

import {ReactNode} from "react";

type Props = {
  children?: ReactNode;
  title?: ReactNode;
  footer?: ReactNode;
}

/** self-contained component with a title and a footer (useful for buttons) */
export const Card = ({ children, footer, title }: Props) => {
  return <div className="card w-96 max-w-full bg-base-100 text-gray-700 shadow-xl h-max">
    <div className="card-body">
      {title && <div className="card-title mb-4">{title}</div>}
      {children}
      {footer && <div className="card-actions mt-4 justify-end">{footer}</div>}
    </div>
  </div>
}