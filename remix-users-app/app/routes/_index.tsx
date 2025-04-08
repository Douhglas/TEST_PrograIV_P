import { useEffect, useState } from 'react';
import type { User } from '~/types';
import { UserTable } from '~/components/UserTable';
import { Loading } from '~/components/Loading';
import { ErrorMessage } from '~/components/ErrorMessage';

const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    country: 'Canada',
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Smith',
    country: 'USA',
    photo: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '3',
    firstName: 'Carla',
    lastName: 'Martinez',
    country: 'Mexico',
    photo: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
];

export default function Index() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortState, setSortState] = useState<{
    column: keyof User;
    ascending: boolean;
  }>({ column: 'country', ascending: true });

  useEffect(() => {
    const fetchUsers = () => {
      setLoading(true);
      setTimeout(() => {
        const success = true;
        if (success) {
          setUsers(mockUsers);
          setLoading(false);
        } else {
          setError('Error fetching users');
          setLoading(false);
        }
      }, 1000);
    };

    fetchUsers();
  }, []);

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleSort = (column: keyof User) => {
    setUsers((prev) => {
      const sorted = [...prev].sort((a, b) => {
        const aVal = a[column].toLowerCase();
        const bVal = b[column].toLowerCase();
        if (aVal < bVal) return sortState.ascending ? -1 : 1;
        if (aVal > bVal) return sortState.ascending ? 1 : -1;
        return 0;
      });

      return sorted;
    });

    setSortState((prev) => ({
      column,
      ascending: column === prev.column ? !prev.ascending : true,
    }));
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className='main'>
      <div className='main-div'>
      <h1>User List</h1>
      <UserTable
        users={users}
        onDelete={handleDelete}
        onSort={handleSort}
        sortState={sortState}
      />
      </div>
    </main>
  );
}
