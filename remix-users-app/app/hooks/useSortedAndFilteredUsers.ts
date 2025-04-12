import { useMemo } from 'react';
import { useDebounce } from './useDebounce';
import type { User } from '~/types';

export function useSortedAndFilteredUsers(
  users: User[],
  sortColumn: keyof User,
  ascending: boolean,
  filterText: string
) {
  const debouncedFilter = useDebounce(filterText, 800);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const aVal = (a[sortColumn] as string)?.toLowerCase() ?? '';
      const bVal = (b[sortColumn] as string)?.toLowerCase() ?? '';
      if (aVal < bVal) return ascending ? -1 : 1;
      if (aVal > bVal) return ascending ? 1 : -1;
      return 0;
    });
  }, [users, sortColumn, ascending]);

  const filteredUsers = useMemo(() => {
    const search = debouncedFilter.toLowerCase();
    return sortedUsers.filter((user) =>
      user.country.toLowerCase().startsWith(search)
    );
  }, [sortedUsers, debouncedFilter]);

  return filteredUsers;
}
