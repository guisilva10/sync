"use client";

import { MoonStarIcon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

const ToggleMenu = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="border-border/60 mr-0 ml-auto border-l pl-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="border-border/60 hover:bg-muted size-9 rounded-full border"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <MoonStarIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Alternar tema</span>
      </Button>
    </div>
  );
};

export default ToggleMenu;
