import pool from '../config/db';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: number;
  role: 'Technician' | 'Client';
}

export const createUser = async (user: Omit<User, 'id'>): Promise<void> => {
  const { name, email, password, role } = user;
  const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  await pool.execute(query, [name, email, password, role]);
};

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  const query = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await pool.execute(query, [email]);
  return (rows as User[])[0];
};

export const updateUserProfile = async (userId: number, profile: Partial<User>): Promise<void> => {
  const { name, email, phone } = profile;
  const query = 'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?';
  await pool.execute(query, [name, email, phone, userId]);
};
