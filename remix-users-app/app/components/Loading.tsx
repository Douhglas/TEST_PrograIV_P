import React from 'react';
import { LoadingProps } from '../types';

export const Loading: React.FC<LoadingProps> = ({ message = 'Loading users...' }) => {
  return <p>{message}</p>;
};
