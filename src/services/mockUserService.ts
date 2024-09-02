// src/services/mockUserService.ts

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  applications: string[];
}

class MockUserService {
  private users: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', applications: ['App1', 'App2'] },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'manager', applications: ['App1'] },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'employee', applications: [] },
  ];

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const newUser = { ...user, id: String(this.users.length + 1) };
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updates };
      return this.users[index];
    }
    return undefined;
  }

  async deleteUser(id: string): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);
    return this.users.length !== initialLength;
  }
}

export const mockUserService = new MockUserService();
