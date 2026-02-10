// hook personalizado e genérico

import { useState, useEffect, useCallback } from "react";

export function useApi<T>(apiCall: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const result = await apiCall();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Erro desconhecido'));
        } finally {
            setLoading(false);
        }
    }, [apiCall]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refresh: fetchData };

}