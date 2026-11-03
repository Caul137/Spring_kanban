const API_URL =  '/api'

const STATUS_BY_API_VALUE = {
  TODO: 'todo',
  IN_PROGRESS: 'inProgress',
  REVIEW: 'review',
  IN_REVIEW: 'review',
  DONE: 'done',
};

const PRIORITY_BY_API_VALUE = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

function toTaskViewModel(task, index) {
  if (!task || task.id === undefined || typeof task.title !== 'string') {
    throw new Error('A task returned by the API must include an id and a title.');
  }

  const statusKey = String(task.status || '').trim().replace(/[\s-]+/g, '_').toUpperCase();
  const status = STATUS_BY_API_VALUE[statusKey];

  if (!status) {
    throw new Error(`Task "${task.title}" has an unsupported status: "${task.status}".`);
  }

  const assignee = typeof task.assignee === 'string' && task.assignee.trim()
    ? task.assignee.trim()
    : 'Unassigned';
  const initials = assignee
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return {
    id: task.id,
    title: task.title,
    description: task.description || '',
    status,
    priority: PRIORITY_BY_API_VALUE[String(task.priority || 'Low').toLowerCase()] || 'Low',
    category: task.category || 'General',
    assignee,
    initials: initials || '—',
    avatarIndex: index,
    dueDate: task.dueDate || '',
  };
}

export async function getTasks({ signal } = {}) {
  const response = await fetch(`${API_URL}/list`, {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Could not load tasks (HWTTP ${response.status}).`);
  }

  const payload = await response.json();

  if (!Array.isArray(payload)) {
    throw new Error('The tasks API must return an array of tasks.');
  }

  return payload.map(toTaskViewModel);
}

export async function createTask(task) {
  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error(`Could not create task (HTTP ${response.status}).`);
  }

  return toTaskViewModel(await response.json());
}
