import { useCallback, useReducer, useState } from "react"
import { http } from "utils/http"
import { useMountRef } from "./useMount"

interface State<D> {
  error: Error | null
  data: D | null
  status: 'idle' | 'loading' | 'success' | 'error'
}

const defaultInitState: State<null> = {
  status: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

/* eslint-disable*/
const useSafeDispath = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountRef()

  return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [dispatch, mountedRef])
}

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitState,
      ...initialState
    }
  )

  const safeDispatch = useSafeDispath(dispatch)

  const config = {
    ...defaultConfig,
    ...initialConfig
  }

  const [retry, setRetry] = useState(() => { })

  const setData = useCallback((data: D) =>
    safeDispatch({
      data,
      status: 'success',
      error: null
    }),
    [safeDispatch]
  )

  const setError = useCallback((error: Error) =>
    safeDispatch({
      error,
      data: null,
      status: 'error'
    }),
    [safeDispatch]
  )

  const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !(promise instanceof Promise)) return

    setRetry(() => () => {
      runConfig?.retry && run(runConfig.retry(), runConfig)
    })

    safeDispatch({ status: 'loading' })

    return promise
      .then(data => {
        setData(data)
        return data
      })
      .catch(err => {
        if (config?.throwOnError) {
          setError(err)
          return Promise.reject(err)
        }
        return err
      })

  }, [config.throwOnError, safeDispatch, setData, setError])

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    setData,
    run,
    retry,
    ...state
  }
}


export const useHttp = () => {
  return useCallback((...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config }), [])
}
