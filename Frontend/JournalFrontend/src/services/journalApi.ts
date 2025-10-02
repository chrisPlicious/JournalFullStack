import type { CreateJournalDto } from "../models/journal";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Make sure this points to your backend API

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create
export const createJournal = async (data: CreateJournalDto) => {
  const res = await axios.post(`${API_URL}/journalentries`, data, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// Get all
export const getJournals = async () => {
  const res = await axios.get(`${API_URL}/journalentries`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// Get by id
export const getJournalById = async (id: number) => {
  const res = await axios.get(`${API_URL}/journalentries/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// Update
export const updateJournal = async (id: number, data: CreateJournalDto) => {
  const res = await axios.put(`${API_URL}/journalentries/${id}`, data, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// Delete
export const deleteJournal = async (id: number) => {
  const res = await axios.delete(`${API_URL}/journalentries/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
