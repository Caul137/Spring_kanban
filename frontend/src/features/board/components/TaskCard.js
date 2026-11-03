import { ASSIGNEE_AVATARS, PRIORITY_STYLES } from '../constants';
import Icon from '../../../components/Icon';

function TaskCard({ task }) {
  return (
    <article className="group rounded-xl border border-slate-100 bg-white p-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-violet-100 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <span className={`rounded-md px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em] ${PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.Low}`}>
          {task.priority}
        </span>
      </div>
      <h3 className="font-display text-[13px] font-bold leading-snug text-ink">{task.title}</h3>
      <p className="mt-1.5 min-h-9 text-[11px] leading-relaxed text-slate-500">{task.description}</p>
      <span className="mt-3 inline-flex rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500">{task.category}</span>
      <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[8px] font-bold ${ASSIGNEE_AVATARS[task.avatarIndex % ASSIGNEE_AVATARS.length]}`}>
            {task.initials}
          </span>
          <span className="truncate text-[10px] font-medium text-slate-500">{task.assignee}</span>
        </div>
        {task.dueDate && (
          <span className="ml-2 flex shrink-0 items-center gap-1 text-[10px] text-slate-400">
            <Icon name="clock" size={12} /> {task.dueDate}
          </span>
        )}
      </div>
    </article>
  );
}

export default TaskCard;
