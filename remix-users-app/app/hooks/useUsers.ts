import { useState, useEffect } from 'react';

type User = {
  picture: string;
  firstName: string;
  lastName: string;
  country: string;
};

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api/users');
        const data: User[] = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); 

  return { users, loading, error };
};