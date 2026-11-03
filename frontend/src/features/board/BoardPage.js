import { useState } from 'react';
import Icon from '../../components/Icon';
import BoardColumn from './components/BoardColumn';
import CreateTaskModal from './components/CreateTaskModal';
import { BOARD_COLUMNS } from './constants';
import useBoardTasks from './hooks/useBoardTasks';

function BoardPage() {
  const { tasks, isLoading, error, reload, createTask } = useBoardTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const query = searchQuery.trim().toLowerCase();
  const visibleTasks = tasks.filter((task) =>
    `${task.title} ${task.description} ${task.category} ${task.assignee}`
      .toLowerCase()
      .includes(query)
  );

  return (
    <main className="min-h-screen bg-[#f7f8fc] px-5 py-8 text-ink sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-display text-[28px] font-extrabold tracking-tight text-ink sm:text-[32px]">My tasks</h1>
            <p className="mt-1 text-xs text-slate-400">Your tasks, organized by status.</p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <div className="relative flex-1 sm:w-[240px]">
              <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                aria-label="Search tasks"
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search tasks..."
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
              />
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-sm shadow-violet-200 transition hover:bg-violet-700"
            >
              <Icon name="plus" size={15} /> New task
            </button>
          </div>
        </div>

        {isLoading && (
          <p role="status" className="rounded-xl border border-slate-100 bg-white px-5 py-8 text-center text-sm text-slate-500">
            Loading your tasks...
          </p>
        )}

        {!isLoading && error && (
          <div role="alert" className="rounded-xl border border-rose-100 bg-white px-5 py-8 text-center">
            <p className="text-sm font-semibold text-rose-700">Could not load your tasks</p>
            <p className="mt-2 text-xs text-slate-500">{error}</p>
            <button
              onClick={reload}
              className="mt-4 rounded-lg bg-violet-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-violet-700"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !error && tasks.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-200 bg-white/70 px-5 py-12 text-center text-sm text-slate-500">
            You don&apos;t have any tasks yet.
          </p>
        )}

        {!isLoading && !error && tasks.length > 0 && visibleTasks.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-200 bg-white/70 px-5 py-12 text-center text-sm text-slate-500">
            No tasks match your search.
          </p>
        )}

        {!isLoading && !error && visibleTasks.length > 0 && (
          <div className="flex gap-4 overflow-x-auto pb-5">
            {BOARD_COLUMNS.map((column) => (
              <BoardColumn
                key={column.id}
                column={column}
                tasks={visibleTasks.filter((task) => task.status === column.id)}
              />
            ))}
          </div>
        )}
      </div>
      {isCreateModalOpen && (
        <CreateTaskModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={createTask}
        />
      )}
    </main>
  );
}

export default BoardPage;
