import { useState } from 'react';
import useNotesStore from '../../store/useNotesStore';
import Button from '../common/Button';

const NotesWidget = () => {
  const notes = useNotesStore((state) => state.notes);
  const addNote = useNotesStore((state) => state.addNote);
  const updateNote = useNotesStore((state) => state.updateNote);
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const clearNotes = useNotesStore((state) => state.clearNotes);

  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAdd = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    addNote(trimmed);
    setDraft('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const saveEdit = () => {
    const trimmed = editText.trim();
    if (trimmed) updateNote(editingId, trimmed);
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="rounded-xl border border-line bg-panel p-5 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-white">
          Notes
        </h3>
        {notes.length > 0 ? (
          <button
            onClick={clearNotes}
            className="focus-ring text-xs font-medium text-red-400 hover:text-red-300"
          >
            Clear all
          </button>
        ) : null}
      </div>

      <div className="mb-3 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a quick note..."
          className="focus-ring flex-1 rounded-lg border border-line bg-panel2 px-3 py-2 text-sm text-white placeholder:text-muted/60 focus:border-accent"
        />
        <Button onClick={handleAdd} className="px-4">
          Add
        </Button>
      </div>

      <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
        {notes.length === 0 && (
          <p className="text-sm text-muted">No notes yet. Add one above.</p>
        )}

        {notes.map((note) => (
          <div
            key={note.id}
            className="flex items-start justify-between gap-2 rounded-lg bg-panel2 px-3 py-2"
          >
            {editingId === note.id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                autoFocus
                className="focus-ring flex-1 rounded-md border border-accent bg-ink px-2 py-1 text-sm text-white"
              />
            ) : (
              <p className="flex-1 break-words text-sm text-white">{note.text}</p>
            )}

            <div className="flex shrink-0 gap-2">
              {editingId === note.id ? (
                <button
                  onClick={saveEdit}
                  className="focus-ring text-xs font-semibold text-accent2"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEdit(note)}
                  className="focus-ring text-xs font-semibold text-muted hover:text-white"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteNote(note.id)}
                className="focus-ring text-xs font-semibold text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesWidget;
