import type { User } from '../types/user';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(`${BASE_URL}/users`);

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  },

  getUser: async (id: number): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  },
};
