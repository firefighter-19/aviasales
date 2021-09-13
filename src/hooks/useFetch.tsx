/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useRef } from 'react';

interface State<T> {
    data?: T;
    error?: Error;
}

type Action<T> =
    | { type: 'loading' }
    | { type: 'fetched'; payload: T }
    | { type: 'error'; payload: Error };

interface Props {
    url: string;
    options?: RequestInit;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useFetch<T>({ url, options }: Props): State<T> {
    const cancelRequest = useRef<boolean>(false);

    const initialState: State<T> = {
        error: undefined,
        data: undefined,
    };

    function fetchReducer(state: State<T>, action: Action<T>): State<T> {
        switch (action.type) {
            case 'loading':
                return { ...initialState };
            case 'fetched':
                return { ...initialState, data: action.payload };
            case 'error':
                return { ...initialState, error: action.payload };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        if (!url) return;

        async function fetchData() {
            dispatch({ type: 'loading' });

            const response = await fetch(url, options);

            try {
                const data = await response.json();

                if (cancelRequest.current) return;
                if ('stop' in data) {
                    if (data.stop) {
                        dispatch({ type: 'fetched', payload: data });
                    } else {
                        fetchData();
                    }
                } else {
                    dispatch({ type: 'fetched', payload: data });
                }
            } catch (error) {
                if (!response.ok) {
                    dispatch({ type: 'error', payload: error as Error });
                    fetchData(); // заглушка для получения билетов без постоянного обновления страницы вручную при получении статуса 500.
                }
            }
        }
        fetchData();

        // eslint-disable-next-line consistent-return
        return () => {
            cancelRequest.current = true;
        };
    }, [url]);
    return state;
}
