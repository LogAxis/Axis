import { Request, Response } from 'express';
import { createJob, getJobsByClientId, getJobById, Job } from '../models/Job';
import { User } from '../models/User';

export const createJobRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const clientId = (req.user as User).id as number;
    const { title, description } = req.body;
    await createJob({ title, description, clientId });
    res.status(201).json({ message: 'Job created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating job', error });
  }
};

export const getClientJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const clientId = (req.user as User).id as number;
    const jobs = await getJobsByClientId(clientId);
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};

export const getJobDetails = async (req: Request, res: Response): Promise<any> => {
  try {
    const jobId = parseInt(req.params.id, 10);
    const job = await getJobById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching job details', error });
  }
};
