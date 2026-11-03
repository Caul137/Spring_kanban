import { useState } from 'react';
import Icon from '../../../components/Icon';
import { BOARD_COLUMNS } from '../constants';

function CreateTaskModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('TODO');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await onCreate({ title: title.trim(), status });
      onClose();
    } catch (createError) {
      setError(createError.message || 'An unexpected error occurred while creating the task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && !isSubmitting) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-task-title"
        className="w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-panel sm:p-7"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 id="create-task-title" className="font-display text-xl font-extrabold text-ink">Create a task</h2>
            <p className="mt-1 text-xs text-slate-500">Add a task to your board.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-ink disabled:opacity-50"
            aria-label="Close dialog"
          >
            <Icon name="close" size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block" htmlFor="task-title">
            <span className="mb-1.5 block text-xs font-semibold text-slate-600">Task title</span>
            <input
              autoFocus
              required
              maxLength={100}
              id="task-title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What needs to get done?"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-slate-300 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            />
          </label>
          <label className="block" htmlFor="task-status">
            <span className="mb-1.5 block text-xs font-semibold text-slate-600">Status</span>
            <select
              id="task-status"
              name="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            >
              {BOARD_COLUMNS.map((column) => (
                <option key={column.id} value={column.apiStatus}>{column.title}</option>
              ))}
            </select>
          </label>
          {error && <p role="alert" className="text-xs font-medium text-rose-600">{error}</p>}
          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting ? 'Creating...' : 'Create task'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CreateTaskModal;
