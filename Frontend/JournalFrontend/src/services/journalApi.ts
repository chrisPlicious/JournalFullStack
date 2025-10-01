import type { CreateJournalDto } from "../models/journal";
import api from "./api";

// Create
export const createJournal = async (data: CreateJournalDto) => {
  const res = await api.post("/journalentries", data);
  return res.data;
};

// Get all
export const getJournals = async () => {
  const res = await api.get("/journalentries");
  return res.data;
};
// Get by id
export const getJournalById = async (id: number) => {
  const res = await api.get(`/journalentries/${id}`);
  return res.data;
};

// Update
export const updateJournal = async (id: number, data: CreateJournalDto) => {
  const res = await api.put(`/journalentries/${id}`, data);
  return res.data;
};

// Delete
export const deleteJournal = async (id: number) => {
  const res = await api.delete(`/journalentries/${id}`);
  return res.data;
};
