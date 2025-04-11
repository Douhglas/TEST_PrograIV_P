import { useState, useEffect } from 'react';
import type { User } from '~/types';

//usar const response = await fetch('http://127.0.0.1:5000/api/users'); para usar el se4rvidor en local 
export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://test-prograiv.onrender.com//api/users');
                if (!response.ok) {
                    throw new Error('Error al obtener los usuarios');
                }
                const data = await response.json();
                setUsers(data.results);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, setUsers, loading, error }; // Exponer setUsers
};