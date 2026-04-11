import { ReactNode } from "react";

const AppShell = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen w-full justify-center bg-muted">
    <div className="relative w-full max-w-[480px] min-h-screen bg-card shadow-lg">
      {children}
    </div>
  </div>
);

export default AppShell;
