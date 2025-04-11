import { useEffect, useState } from 'react';
import type { User } from '~/types';
import { UserTable } from '~/components/UserTable';
import { Loading } from '~/components/Loading';
import { ErrorMessage } from '~/components/ErrorMessage';
import { useUsers } from '~/hooks/useUsers';
import { useCallback } from 'react';
import { useSortedAndFilteredUsers } from '~/hooks/useSortedAndFilteredUsers';

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
  
  const filteredUsers = useSortedAndFilteredUsers(
    users,
    sortState.column,
    sortState.ascending,
    filterText
  );

  useEffect(() => {
    if (filterText === '') {
      setSortState({ column: 'country', ascending: true });
    }
  }, [filterText]);

  const handleDelete = useCallback(
    (id: string) => {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    },
    [setUsers]
  );

  const handleSort = useCallback((column: keyof User) => {
    setSortState((prev) => ({
      column,
      ascending: column === prev.column ? !prev.ascending : true,
    }));
  }, []);

  return (
    <main className="main" aria-live="polite">
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="main-div">
          <div className='filter-container'>
            
            <input
              type="text"
              placeholder="🔍 Filter by country..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="filter-input"
            />
          </div>

          <UserTable
            users={filteredUsers}
            onDelete={handleDelete}
            onSort={handleSort}
            sortState={sortState}
          />
        </div>
      )}
    </main>
  );
}
