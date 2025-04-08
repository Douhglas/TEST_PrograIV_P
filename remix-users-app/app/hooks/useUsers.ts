import { useState, useEffect } from 'react';
import type { User } from '~/types';

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/users');
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