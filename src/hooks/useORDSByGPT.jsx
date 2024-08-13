import { useState, useEffect, useCallback, useRef } from 'react';

const useORDS = ({
  queryKey,
  fetchFunction = null,
  mutationFunction = null,
  options = {},
}) => {
  const {
    enabled = true,
    onSuccess = () => {},
    onError = () => {},
    onSettled = () => {},
    manual = false,
    refetchInterval = null,
  } = options;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cache, setCache] = useState({});

  const fetchOnce = useRef(false); // Flag to ensure fetch runs only once

  const fetchData = useCallback(async () => {
    if (!fetchFunction || fetchOnce.current) return;

    const cacheKey = JSON.stringify(queryKey);

    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const response = await fetchFunction();
      setData(response.data);
      setCache((prevCache) => ({
        ...prevCache,
        [cacheKey]: { data: response.data, timestamp: Date.now() },
      }));

      setIsSuccess(true);
      fetchOnce.current = true; // Mark fetch as complete
      onSuccess(response.data);
    } catch (err) {
      setIsError(true);
      setError(err);
      onError(err);
    } finally {
      setIsLoading(false);
      onSettled(data, error);
    }
  }, [fetchFunction, queryKey, cache, onSuccess, onError, onSettled]);

  useEffect(() => {
    let intervalId;
    if (refetchInterval && enabled && !manual) {
      fetchData(); // Initial fetch
      intervalId = setInterval(fetchData, refetchInterval);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [fetchData, refetchInterval, enabled, manual]);

  useEffect(() => {
    if (enabled && !manual && !refetchInterval) {
      fetchData();
    }
  }, [enabled, manual, fetchData, refetchInterval]);

  const invalidateQuery = () => {
    const cacheKey = JSON.stringify(queryKey);
    setCache((prevCache) => ({
      ...prevCache,
      [cacheKey]: null,
    }));
  };

  const mutate = useCallback(
    async (variables) => {
      if (!mutationFunction) return;

      setIsLoading(true);
      setIsError(false);
      setError(null);

      try {
        const response = await mutationFunction(variables);
        setIsSuccess(true);
        setData(response.data);

        invalidateQuery();
        onSuccess(response.data, variables);
      } catch (err) {
        setIsError(true);
        setError(err);
        onError(err, variables);
      } finally {
        setIsLoading(false);
        onSettled(data, error, variables);
      }
    },
    [mutationFunction, onSuccess, onError, onSettled]
  );

  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch: fetchData,
    mutate,
  };
};

export default useORDS;
