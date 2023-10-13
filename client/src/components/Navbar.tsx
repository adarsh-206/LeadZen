import React, { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';

const Navbar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { setData } = useAppContext();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (searchQuery) {
                    const response = await fetch(
                        `https://jsonplaceholder.typicode.com/users?q=${searchQuery}`
                    );
                    const data = await response.json();
                    setData(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
            }
        };

        fetchUsers();
    }, [searchQuery]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <nav className="bg-transparent p-4 flex items-center justify-between">
            <div className="text-red-500 text-2xl font-bold">LeadZen</div>

            <div className="hidden sm:flex">
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-white text-black p-2 rounded-md"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button className="bg-red-400 hover:bg-red-500 text-white p-2 ml-2 rounded-md">
                    Search
                </button>
            </div>
        </nav>
    );
};

export default Navbar;