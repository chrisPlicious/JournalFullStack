import axios from "axios";
import type { CreateJournalDto } from "../models/journal";

const API_URL = import.meta.env.VITE_API_URL;

// Create 
export const createJournal = async (data: CreateJournalDto) => {
  const res = await axios.post(`${API_URL}/journalentries`, data);
  return res.data;
};

// Get all
export const getJournals = async () => {
  const res = await axios.get(`${API_URL}/journalentries`);
  return res.data;
};

// Get by id
export const getJournalById = async (id: number) => {
  const res = await axios.get(`${API_URL}/journalentries/${id}`);
  return res.data;
};

// Update
export const updateJournal = async (id: number, data: CreateJournalDto) => {
  const res = await axios.put(`${API_URL}/journalentries/${id}`, data);
  return res.data;
};

// Delete
export const deleteJournal = async (id: number) => {
  const res = await axios.delete(`${API_URL}/journalentries/${id}`);
  return res.data;
};
