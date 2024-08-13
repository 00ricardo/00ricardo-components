import { useState, useEffect, useCallback } from 'react';

const useCustomFetch = (
  fetchFunction = null,
  mutateFunction = null,
  options = {}
) => {
  const {
    onSuccess,
    onError,
    intervalFetch = null,
    manual = false,
    enabled = null,
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [alreadyFetchedOnce, setAlreadyFetchedOnce] = useState(false);
  const fetchData = useCallback(async () => {
    if (!fetchFunction || (enabled !== null && !enabled) || alreadyFetchedOnce)
      return;

    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    try {
      const response = await fetchFunction();
      setData(response.data);
      setIsSuccess(true);
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      setIsError(true);
      setError(error);
      if (onError) onError(error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, enabled, onSuccess, onError]);

  useEffect(() => {
    if (manual || enabled === false) return;
    if (!manual && enabled && alreadyFetchedOnce) return;
    if (
      !manual &&
      fetchFunction &&
      intervalFetch === null &&
      enabled &&
      !alreadyFetchedOnce
    ) {
      fetchData(); // Initial fetch only once
      setAlreadyFetchedOnce(true);
    }

    if (intervalFetch && intervalFetch > 0 && fetchFunction) {
      const intervalId = setInterval(fetchData, intervalFetch);
      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [
    alreadyFetchedOnce,
    fetchData,
    intervalFetch,
    manual,
    enabled,
    fetchFunction,
  ]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const mutate = useCallback(
    async (...args) => {
      if (!mutateFunction) return;

      setIsLoading(true);
      setIsError(false);
      setIsSuccess(false);
      try {
        const response = await mutateFunction(...args);
        setData(response.data);
        setIsSuccess(true);
        if (onSuccess) onSuccess(response.data);
      } catch (error) {
        setIsError(true);
        setError(error);
        if (onError) onError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [mutateFunction, onSuccess, onError]
  );

  return {
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    refetch,
    mutate,
  };
};

export default useCustomFetch;
