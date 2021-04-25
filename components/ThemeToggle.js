import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";

const ThemeToggle = () => {

  const [isDark, setIsDark] = useState(document.body.classList.contains('dark'));

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      window.localStorage.setItem('googleTheme', 'dark');
    } else {
      document.body.classList.remove('dark');
      window.localStorage.setItem('googleTheme', 'light');
    }
  }, [isDark]);

  return (
    <div
      className="themeToggle icon"
      onClick={() => setIsDark(!isDark)}
    >
        <SunIcon className="sun" />
        <MoonIcon className="moon" />
    </div>
  );
};

export default ThemeToggle;
