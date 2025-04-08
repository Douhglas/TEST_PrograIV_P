import React from 'react';
import { UserRowProps } from '../types';

export const UserRow: React.FC<UserRowProps> = ({ user, index, onDelete }) => {
  const rowClass = index % 2 === 0 ? 'even-row' : 'odd-row';

  return (
    <tr className={rowClass}>
      <td><img src={user.photo} alt={`${user.firstName} ${user.lastName}`} width={40} /></td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.country}</td>
      <td>
        <button onClick={() => onDelete(user.id)}>Delete</button>
      </td>
    </tr>
  );
};
