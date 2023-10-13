import React, { createContext, useContext, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    address: {
        city: string;
        street: string;
    };
}

export const AppContext = createContext<{
    data: User[] | null;
    setData: (data: User[] | null) => void;
}>({
    data: null,
    setData: () => { },
});

interface AppContextProviderProps {
    children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [data, setData] = useState<User[] | null>(null);

    return (
        <AppContext.Provider value={{ data, setData }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};