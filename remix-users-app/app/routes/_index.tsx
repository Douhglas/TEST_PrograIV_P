import { useEffect, useState, useMemo } from 'react';
import type { User } from '~/types';
import { UserTable } from '~/components/UserTable';
import { Loading } from '~/components/Loading';
import { ErrorMessage } from '~/components/ErrorMessage';
import { useUsers } from '~/hooks/useUsers';
import { useDebounce } from '~/hooks/useDebounce'; 

export default function Index() {
  const { users, setUsers, loading, error } = useUsers();

  const [sortState, setSortState] = useState<{
    column: keyof User;
    ascending: boolean;
  }>({
    column: 'country',
    ascending: true,
  });

  const [filterText, setFilterText] = useState('');
  const debouncedFilter = useDebounce(filterText, 300); 

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleSort = (column: keyof User) => {
    setSortState((prev) => ({
      column,
      ascending: column === prev.column ? !prev.ascending : true,
    }));
  };

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const aVal = (a[sortState.column] as string).toLowerCase();
      const bVal = (b[sortState.column] as string).toLowerCase();
      if (aVal < bVal) return sortState.ascending ? -1 : 1;
      if (aVal > bVal) return sortState.ascending ? 1 : -1;
      return 0;
    });
  }, [users, sortState]);

  const filteredUsers = useMemo(() => {
    return sortedUsers.filter((user) =>
      user.country.toLowerCase().startsWith(debouncedFilter.toLowerCase()) 
    );
  }, [sortedUsers, debouncedFilter]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className='main'>
      <div className='main-div'>
        <h1>User List</h1>

        <input
          type='text'
          placeholder='Filter by country...'
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className='mb-4 p-2 border rounded'
        />

        <UserTable
          users={filteredUsers}
          onDelete={handleDelete}
          onSort={handleSort}
          sortState={sortState}
        />
      </div>
    </main>
  );
}
