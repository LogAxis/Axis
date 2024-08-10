import pool from '../config/db';

export interface Job {
  id?: number;
  title: string;
  description: string;
  clientId: number;
  status: 'Pending' | 'InProgress' | 'Completed';
}

export const createJob = async (job: Omit<Job, 'id' | 'status'>): Promise<void> => {
  const { title, description, clientId } = job;
  const query = 'INSERT INTO jobs (title, description, client_id, status) VALUES (?, ?, ?, ?)';
  await pool.execute(query, [title, description, clientId, 'Pending']);
};

export const getJobsByClientId = async (clientId: number): Promise<Job[]> => {
  const query = 'SELECT * FROM jobs WHERE client_id = ?';
  const [rows] = await pool.execute(query, [clientId]);
  return rows as Job[];
};

export const getJobById = async (jobId: number): Promise<Job | undefined> => {
  const query = 'SELECT * FROM jobs WHERE id = ?';
  const [rows] = await pool.execute(query, [jobId]);
  return (rows as Job[])[0];
};
