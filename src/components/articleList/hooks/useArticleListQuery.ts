import { useReducer } from 'react';

const intialState = {
  size: 10,
  page: 1,
  category: '',
  search: '',
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
        category: data?.category || ''
      }
    }

    case 'search': {
      return {
        ...prevState,
        page: 1,
        category: '',
        search: data?.search || '',
      }
    }

    case 'page': {
      return {
        ...prevState,
        page: prevState.page + 1
      }
    }
  }
}

export const useArtcleListQuery = (init: { search?: string, category?: string }) => useReducer(listQueryReducer, { ...intialState, ...init })
