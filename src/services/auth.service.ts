import type { LoginCredentials } from '../types/auth';
import type { User } from '../types/user';

interface LoginResponse {
  user: User;
  token: string;
}

const DEMO_EMAIL = 'admin@example.com';
const DEMO_PASSWORD = 'password123';

const MOCK_USER: User = {
  id: 1,
  name: 'Admin User',
  username: 'admin',
  email: DEMO_EMAIL,
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    await delay(500);

    const isValid =
      credentials.email === DEMO_EMAIL &&
      credentials.password === DEMO_PASSWORD;

    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    return {
      user: MOCK_USER,
      token: 'mock-token',
    };
  },

  logout: async (): Promise<void> => {
    await delay(200);
  },
};
