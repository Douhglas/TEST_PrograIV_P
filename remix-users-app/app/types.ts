export interface User {
    id: string;
    firstName: string;
    lastName: string;
    country: string;
    photo: string;
  }
  
  export interface UserTableProps {
    users: User[];
    onDelete: (id: string) => void;
    onSort: (column: keyof User) => void;   
    sortState: {
      column: keyof User;
      ascending: boolean;
    };
  }
  
  export interface UserRowProps {
    user: User;
    index: number;
    onDelete: (id: string) => void;
  }
  
  export interface ErrorMessageProps {
    message: string;
  }
  
  export interface LoadingProps {
    message?: string;
  }
  