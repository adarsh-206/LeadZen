import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useAppContext } from './AppContext';

interface User {
    id: number;
    name: string;
    email: string;
    address: {
        city: string;
        street: string;
    };
}

const itemsPerPage = 3;

function Home() {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { data } = useAppContext();

    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data]);

    const fetchData = async () => {
        try {
            const response = await axios.get<User[]>('http://localhost:3000/api/users');
            const responseData = response.data;
            setUsers(responseData);
            console.log("data from api", responseData);
        } catch (error) {
            setError('Failed to fetch data from the API');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const totalPages = users ? Math.ceil(users.length / itemsPerPage) : 1;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleUsers = users ? users.slice(startIndex, endIndex) : [];

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Navbar />
            <h1 className="text-2xl text-black font-bold text-center mt-4 mb-5">All Users</h1>
            {
                users && users.length > 0 ? (
                    visibleUsers.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white m-2 p-2 sm:flex items-center sm:space-x-8 rounded-xl text-center lg:h-36 xl:h-40"
                        >
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
                                <Link to={`/user/${user.id}`}>
                                    <button className="bg-red-500 hover-bg-red-400 text-white font-bold py-2 px-4 rounded-full">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div><p className='text-black font-semibold text-center'>No users found.....</p></div>
                )
            }
            <div className="flex justify-center items-center m-3">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`mr-4 px-4 py-2 rounded-md ${currentPage === 1
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-400 hover-bg-red-500 text-white'
                        }`}
                >
                    Previous
                </button>
                <p className="text-lg">
                    Page {currentPage} of {totalPages}
                </p>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`ml-4 px-4 py-2 rounded-md ${currentPage === totalPages
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-400 hover-bg-red-500 text-white'
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Home;