import React from 'react';
import '~/styles/styles.css';
import { UserTableProps } from '../types';
import { UserRow } from './UserRow';
import { useCallback } from 'react';

function getSortIndicator(active: string, column: string, ascending: boolean) {
  if (active !== column)
    return (
      <span className="sort-indicator" style={{ visibility: 'hidden' }}>
        🔼
      </span>
    );
  return <span className="sort-indicator">{ascending ? '🔼' : '🔽'}</span>;
}

export const UserTable: React.FC<UserTableProps> = React.memo(
  ({ users, onDelete, onSort, sortState }) => {
    const handleSort = useCallback(
      (column: keyof (typeof users)[0]) => {
        onSort(column);
      },
      [onSort]
    );

    return (
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th onClick={() => handleSort('firstName')}>
              First Name {getSortIndicator(sortState.column,'firstName',sortState.ascending)}
            </th>
            <th onClick={() => handleSort('lastName')}>
              Last Name {getSortIndicator(sortState.column,'lastName',sortState.ascending)}
            </th>
            <th onClick={() => handleSort('country')}>
              Country {getSortIndicator(sortState.column,'country',sortState.ascending)}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <div className="empty-state">
                  <img src="/empty.svg" alt="No data" className="empty-image" />
                  <p className="empty-text">No users found</p>
                </div>
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <UserRow
                key={user.id}
                user={user}
                index={index}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    );
  }
);
