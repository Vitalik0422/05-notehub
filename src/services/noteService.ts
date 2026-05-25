import axios from 'axios';
import type { GetNoteRequest, Note } from '../types/note';
axios.defaults.headers.Authorization = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api/';

interface Notes {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search = '',
  page = 1,
  perPage = 12,
): Promise<Notes> => {
  const response = await axios.get(`/notes`, {
    params: {
      search,
      page,
      perPage,
    },
  });
  return response.data;
};

export const createNote = async (note: GetNoteRequest): Promise<Note> => {
  const response = await axios.post('/notesі', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete(`/notes/${id}`);
  return response.data;
};
