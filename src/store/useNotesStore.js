import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useNotesStore = create(
  persist(
    (set) => ({
      notes: [],

      addNote: (text) =>
        set((state) => ({
          notes: [
            {
              id: Date.now().toString(),
              text,
              createdAt: new Date().toISOString(),
            },
            ...state.notes,
          ],
        })),

      updateNote: (id, text) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, text } : note
          ),
        })),

      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),

      clearNotes: () => set({ notes: [] }),
    }),
    {
      name: 'super-app-notes',
    }
  )
);

export default useNotesStore;
