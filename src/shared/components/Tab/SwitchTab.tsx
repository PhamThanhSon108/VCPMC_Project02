import React, { ReactNode } from "react";

export default function SwitchTab({ children }: { children: ReactNode }) {
  return <div className="tab-switch-wrap">{children}</div>;
}
