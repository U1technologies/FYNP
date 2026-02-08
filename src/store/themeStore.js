import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    const setTheme = (isDark) => {
        setIsDarkMode(isDark);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeStore = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeStore must be used within a ThemeProvider');
    }
    return context;
};
