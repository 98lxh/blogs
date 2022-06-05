import { useReducer } from 'react';
const intialState = {
  size: 10,
  page: 1,
  categoryId: 0,
  reset: false
}

type QueryAction = {
  data?: Partial<typeof intialState>
  type: 'category' | 'page'
}

const listQueryReducer = (prevState: typeof intialState, action: QueryAction) => {
  const { type, data } = action
  switch (type) {
    case 'category': {
      return {
        ...intialState,
        reset: true,
        categoryId: data?.categoryId || 0
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

export const useListQuery = () => useReducer(listQueryReducer, intialState)
