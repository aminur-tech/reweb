
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (

    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}  
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

export default Providers;