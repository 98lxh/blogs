import { useReducer } from 'react';

const intialState = {
  size: 10,
  page: 1,
  category: '',
  search: '',
  reset: false
}

type QueryAction = {
  data?: Partial<typeof intialState>
  type: 'category' | 'page' | 'search'
}

const listQueryReducer = (prevState: typeof intialState, action: QueryAction) => {
  const { type, data } = action

  switch (type) {
    case 'category': {
      return {
        ...intialState,
        reset: true,
        category: data?.category || ''
      }
    }

    case 'search': {
      return {
        ...prevState,
        page: 1,
        reset: true,
        category: '',
        search: data?.search || '',
      }
    }

    case 'page': {
      return {
        ...prevState,
        reset: false,
        page: prevState.page + 1
      }
    }
  }
}

export const useArtcleListQuery = (init: { search?: string, category?: string }) => useReducer(listQueryReducer, { ...intialState, ...init })
