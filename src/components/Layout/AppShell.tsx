import { ReactNode } from "react";

const AppShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen w-full bg-background flex flex-col">
    <div className="w-full flex-1">
      {children}
    </div>
  </div>
);

export default AppShell;
