import { useEffect, useState, useCallback } from 'react';
import type { User } from '~/types';
import { UserTable } from '~/components/UserTable';
import { Loading } from '~/components/Loading';
import { ErrorMessage } from '~/components/ErrorMessage';
import { useUsers } from '~/hooks/useUsers';
import { useSortedAndFilteredUsers } from '~/hooks/useSortedAndFilteredUsers';
import { useDebounce } from '~/hooks/useDebounce';
import { useTheme } from '~/components/ThemeProvider';
import { usePagination } from '~/hooks/usePagination'
import '~/styles/styles.css';

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

  const {currentPage, totalPages, currentItems: currentUsers, goToNextPage,
    goToPreviousPage,
    goToPage,
  } = usePagination(filteredUsers, 10);

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

  useEffect(() => {
    if (totalPages === 0) {
      goToPage(0); 
    } else if (currentPage > totalPages) {
      goToPage(totalPages); 
    }
  }, [totalPages, currentPage, goToPage]);

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

  return (
    <main className="main" aria-live="polite">
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="main-div">
          <div className="flex-between">
            <button
              onClick={toggleTheme}
              className={'toggle-theme-btn' + (isDark ? '-dark' : '')}
            >
              {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>

            <button
              onClick={restoreInitialState}
              disabled={isInitialState}
              className={
                'restart-btn' + (isInitialState ? ' restart-btn-disabled' : '')
              }
              aria-label="Restore table to initial state"
            >
              Restart 🔄
            </button>
          </div>

          <div className="filter-container">
            <input
              type="text"
              placeholder="🔍 Filter by country..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="hidden md:block">
            <UserTable
              users={currentUsers}
              onDelete={handleDelete}
              onSort={handleSort}
              sortState={sortState}
            />
          </div>

          <div className="pagination-controls flex justify-center mt-4">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1 || totalPages === 0}
              className="px-4 py-2 border rounded mr-2 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-4 py-2 border rounded ml-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>  

          <div className="mobile-cards stacked-elements horizontal-padding">
            {filteredUsers.length === 0 ? (
              <div className="empty-message">No users found</div>
            ) : (
              filteredUsers.map((user) => (
                <div key={user.id} className="user-card">
                  <div className="user-info-container">
                    <img
                      src={user.photo}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="profile-image"
                    />
                    <div className="text-container">
                      <p className="user-name">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="user-country">{user.country}</p>
                    </div>
                  </div>
                  <div className="delete-button-container">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="delete-button"
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
