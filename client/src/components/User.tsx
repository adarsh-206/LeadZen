import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    email: string;
    address: {
        city: string;
        street: string;
    };
}

const User: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await axios.get<User>(`http://localhost:3000/api/users/${id}`);
            setUser(response.data);

        } catch (error) {
            setError('Failed to fetch user details from the API');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>User not found.</div>;
    }

    return (
        <div>
            <h1 className="text-2xl text-black font-bold text-center mt-4 mb-5">User Details</h1>
            <div className="bg-white m-2 p-2 sm:flex items-center sm:space-x-8 rounded-xl text-center lg:h-36 xl:h-40">
                <div className="flex-1">
                    <p className="text-xl">{user.name}</p>
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-lg">Contact</p>
                    <p className="text-lg">{user.email}</p>
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-lg">Street</p>
                    <p className="text-lg">{user.address.street}</p>
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-lg">City</p>
                    <p className="text-lg">{user.address.city}</p>
                </div>
                <div className="flex-1">
                    <Link to="/">
                        <button className="bg-red-500 hover-bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                            Go Back
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default User;