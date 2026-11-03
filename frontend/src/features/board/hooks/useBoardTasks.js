import { useEffect, useState } from 'react';
import { createTask as createTaskRequest, getTasks } from '../services/tasksApi';

function useBoardTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTasks() {
      setIsLoading(true);
      setError('');

      try {
        const apiTasks = await getTasks({ signal: controller.signal });
        setTasks(apiTasks);
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'An unexpected error occurred while loading tasks.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadTasks();

    return () => controller.abort();
  }, [reloadKey]);

  function reload() {
    setReloadKey((currentKey) => currentKey + 1);
  }

  async function createTask(task) {
    const createdTask = await createTaskRequest(task);
    setTasks((currentTasks) => [...currentTasks, {
      ...createdTask,
      avatarIndex: currentTasks.length,
    }]);
  }

  return { tasks, isLoading, error, reload, createTask };
}

export default useBoardTasks;
