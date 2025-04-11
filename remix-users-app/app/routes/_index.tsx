import { useEffect, useState, useMemo } from 'react';
import type { User } from '~/types';
import { UserTable } from '~/components/UserTable';
import { Loading } from '~/components/Loading';
import { ErrorMessage } from '~/components/ErrorMessage';
import { useUsers } from '~/hooks/useUsers';
import { useDebounce } from '~/hooks/useDebounce';

export default function Index() {
  const { users, setUsers, originalUsers, restoreUsers, loading, error } = useUsers();

  const [sortState, setSortState] = useState<{
    column: keyof User;
    ascending: boolean;
  }>({
    column: 'country',
    ascending: true,
  });

  const [filterText, setFilterText] = useState('');
  const debouncedFilter = useDebounce(filterText, 300);

  useEffect(() => {
    if (filterText === '') {
      setSortState({ column: 'country', ascending: true });
    }
  }, [filterText]);

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleSort = (column: keyof User) => {
    setSortState((prev) => ({
      column,
      ascending: column === prev.column ? !prev.ascending : true,
    }));
  };

  const restoreInitialState = () => {
    restoreUsers();
    setFilterText('');
    setSortState({ column: 'country', ascending: true });
  };

  const isInitialState =
    filterText === '' &&
    sortState.column === 'country' &&
    sortState.ascending &&
    users.length === originalUsers.length;

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const aVal = (a[sortState.column] as string)?.toLowerCase() ?? '';
      const bVal = (b[sortState.column] as string)?.toLowerCase() ?? '';
      if (aVal < bVal) return sortState.ascending ? -1 : 1;
      if (aVal > bVal) return sortState.ascending ? 1 : -1;
      return 0;
    });
  }, [users, sortState]);

  const filteredUsers = useMemo(() => {
    const search = debouncedFilter.toLowerCase();
    return sortedUsers.filter((user) =>
      user.country.toLowerCase().startsWith(search)
    );
  }, [sortedUsers, debouncedFilter]);

  return (
    <main className="main" aria-live="polite">
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className="main-div">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <input
              type="text"
              placeholder="🔍 Filter by country..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="filter-input"
            />
            <button
              onClick={restoreInitialState}
              disabled={isInitialState}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: isInitialState ? '#cccccc' : '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isInitialState ? 'not-allowed' : 'pointer',
                opacity: isInitialState ? 0.7 : 1,
                transition: 'background-color 0.2s'
              }}
              aria-label="Restore table to initial state"
            >
              Restaurar
            </button>
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
