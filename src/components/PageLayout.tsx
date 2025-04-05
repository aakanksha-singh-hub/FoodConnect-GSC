import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

const PageLayout = ({ children, className = "" }: PageLayoutProps) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <main className="flex-grow pt-16">{children}</main>
    </div>
  );
};

export default PageLayout;
