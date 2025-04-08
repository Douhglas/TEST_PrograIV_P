import React from 'react';
import './UserTable.css';
import { UserTableProps } from '../types';
import { UserRow } from './UserRow';

export const UserTable: React.FC<UserTableProps> = ({ users, onDelete, onSort, sortState }) => {
  const handleSort = (column: keyof typeof users[0]) => {
    onSort(column);
  };

  const getSortIndicator = (column: string) => {
    if (sortState?.column !== column) {
      return <span className="sort-indicator" style={{ visibility: 'hidden' }}>🔼</span>;
    }
    return (
      <span className="sort-indicator">
        {sortState.ascending ? '🔼' : '🔽'}
      </span>
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Photo</th>
          <th onClick={() => handleSort('firstName')}>
            First Name {getSortIndicator('firstName')}
          </th>
          <th onClick={() => handleSort('lastName')}>
            Last Name {getSortIndicator('lastName')}
          </th>
          <th onClick={() => handleSort('country')}>
            Country {getSortIndicator('country')}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <UserRow key={user.id} user={user} index={index} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};
