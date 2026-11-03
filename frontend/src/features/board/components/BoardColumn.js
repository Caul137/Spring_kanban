import TaskCard from './TaskCard';

function BoardColumn({ column, tasks }) {
  return (
    <section className="min-w-[264px] flex-1" aria-labelledby={`column-${column.id}`}>
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <span className={`h-2 w-2 rounded-full ${column.color}`} />
          <h2 id={`column-${column.id}`} className="font-display text-[13px] font-bold text-ink">{column.title}</h2>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-white px-1.5 text-[10px] font-semibold text-slate-400 shadow-sm">{tasks.length}</span>
        </div>
      </div>
      <div className={`mb-3 h-0.5 rounded-full ${column.color} opacity-60`} />
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 bg-white/50 px-4 py-8 text-center text-xs text-slate-400">
            No tasks in this column
          </div>
        )}
      </div>
    </section>
  );
}

export default BoardColumn;
