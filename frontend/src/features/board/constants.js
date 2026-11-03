export const BOARD_COLUMNS = [
  { id: 'todo', apiStatus: 'TODO', title: 'To do', color: 'bg-slate-400', tint: 'bg-slate-100' },
  { id: 'inProgress', apiStatus: 'IN_PROGRESS', title: 'In progress', color: 'bg-violet-500', tint: 'bg-violet-50' },
  { id: 'review', apiStatus: 'REVIEW', title: 'In review', color: 'bg-amber-400', tint: 'bg-amber-50' },
  { id: 'done', apiStatus: 'DONE', title: 'Done', color: 'bg-emerald-500', tint: 'bg-emerald-50' },
];

export const PRIORITY_STYLES = {
  High: 'bg-rose-50 text-rose-600',
  Medium: 'bg-amber-50 text-amber-700',
  Low: 'bg-sky-50 text-sky-700',
};

export const ASSIGNEE_AVATARS = [
  'bg-rose-100 text-rose-700',
  'bg-amber-100 text-amber-700',
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
  'bg-emerald-100 text-emerald-700',
];
