import React from 'react';
import './UserTable.css';
import { UserTableProps } from '../types';
import { UserRow } from './UserRow';

export const UserTable: React.FC<UserTableProps> = ({ users, onDelete, onSort}) => {
  const handleSort = (column: keyof typeof users[0]) => {
    onSort(column);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Photo</th>
          <th onClick={() => handleSort('firstName')}>First Name</th>
          <th onClick={() => handleSort('lastName')}>Last Name</th>
          <th onClick={() => handleSort('country')}>Country</th>
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
