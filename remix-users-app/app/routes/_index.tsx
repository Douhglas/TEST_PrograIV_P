import { useEffect, useState } from 'react';
import type { User } from '~/types';
import { UserTable } from '~/components/UserTable';
import { Loading } from '~/components/Loading';
import { ErrorMessage } from '~/components/ErrorMessage';
import { useUsers } from '~/hooks/useUsers';



export default function Index() {
  const { users,setUsers, loading, error } = useUsers();

  const [sortState, setSortState] = useState<{
    column: keyof User;
    ascending: boolean;
  }>({ column: 'country', ascending: true });

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id != id));
  };

  const handleSort = (column: keyof User) => {
    setUsers((prev) => {
      const sorted = [...prev].sort((a, b) => {
        const aVal = (a[column] as string).toLowerCase();
        const bVal = (b[column] as string).toLowerCase();
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
