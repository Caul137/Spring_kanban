import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import BoardPage from './BoardPage';

const task = {
  id: 1,
  title: 'Review API integration',
  description: 'Check the tasks endpoint.',
  status: 'IN_PROGRESS',
  priority: 'HIGH',
  category: 'Development',
  assignee: 'Jordan Davis',
  dueDate: '2026-11-02',
};

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders tasks returned by the API in the My tasks board', async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => [task],
  });

  render(<BoardPage />);

  expect(screen.getByRole('heading', { name: 'My tasks' })).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent(/loading your tasks/i);
  expect(await screen.findByText('Review API integration')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'In progress' })).toBeInTheDocument();
  expect(screen.queryByText(/product launch/i)).not.toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith('/api/list', expect.objectContaining({
    headers: { Accept: 'application/json' },
  }));
});

test('shows an API error and retries the request', async () => {
  global.fetch
    .mockRejectedValueOnce(new Error('Network unavailable'))
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [task],
    });

  render(<BoardPage />);

  expect(await screen.findByRole('alert')).toHaveTextContent('Network unavailable');
  fireEvent.click(screen.getByRole('button', { name: /try again/i }));

  await waitFor(() => {
    expect(screen.getByText('Review API integration')).toBeInTheDocument();
  });
  expect(global.fetch).toHaveBeenCalledTimes(2);
});

test('creates a task using the selected status and renders the API response', async () => {
  global.fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 2,
        title: 'Prepare release notes',
        status: 'IN_PROGRESS',
      }),
    });

  render(<BoardPage />);

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  fireEvent.click(await screen.findByRole('button', { name: /new task/i }));
  fireEvent.change(screen.getByLabelText(/task title/i), {
    target: { value: 'Prepare release notes' },
  });
  fireEvent.change(screen.getByLabelText(/status/i), {
    target: { value: 'IN_PROGRESS' },
  });
  fireEvent.click(screen.getByRole('button', { name: /create task/i }));

  expect(await screen.findByText('Prepare release notes')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'In progress' })).toBeInTheDocument();
  expect(global.fetch).toHaveBeenLastCalledWith('/api/create', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'Prepare release notes',
      status: 'IN_PROGRESS',
    }),
  });
});
