import { useEffect, useState } from 'react';
import type { User } from '~/types';
import { UserTable } from '~/components/UserTable';
import { Loading } from '~/components/Loading';
import { ErrorMessage } from '~/components/ErrorMessage';
import { useUsers } from '~/hooks/useUsers';

import { useCallback } from 'react';
import { useSortedAndFilteredUsers } from '~/hooks/useSortedAndFilteredUsers';
import { useDebounce } from '~/hooks/useDebounce';
import { useTheme } from '~/components/ThemeProvider';


export default function Index() {
  const { isDark, toggleTheme } = useTheme();
  const { users, setUsers, originalUsers, restoreUsers, loading, error } = useUsers();

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
    <main className="main bg-white text-black dark:bg-zinc-900 dark:text-white px-0 sm:px-4" aria-live="polite">
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="main-div">
          {/* Controles superiores - extendidos */}
          <div className='flex justify-between px-2 sm:px-4 gap-2 sm:gap-4'>
            <button onClick={toggleTheme} className={`px-3 sm:px-4 py-2 border rounded transition-colors duration-300 flex-1 sm:flex-none ${isDark
              ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-100 hover:text-gray-800"
              : "bg-gray-300 text-black border-gray-500 hover:bg-gray-800 hover:text-gray-100"
              }`}>
              {isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
            </button>

            <button
              onClick={restoreInitialState}
              disabled={isInitialState}
              className={`px-3 sm:px-4 py-2 rounded transition-colors duration-300 flex-1 sm:flex-none ${isInitialState
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              aria-label="Restore table to initial state"
            >
              Restart 🔄
            </button>
          </div>

          <div className="mt-4 mb-6 px-2 sm:px-0">
            <input
              type="text"
              placeholder="🔍 Filter by country..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="hidden md:block">
            <UserTable
              users={filteredUsers}
              onDelete={handleDelete}
              onSort={handleSort}
              sortState={sortState}
            />
          </div>

          <div className="md:hidden space-y-4 px-2">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No users found
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div key={user.id} className="border rounded-lg p-4 dark:border-gray-700 w-full">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.photo}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium dark:text-white">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="truncate text-gray-600 dark:text-gray-300">
                        {user.country}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-center">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-4 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </main>
  );
}
