export const EXCEPTION_USER = {
  LOGIN_FAILED: {
    code: 1001,
    message: '登录异常~'
  },

  LOGIN_OVERDUE: {
    code: 2002,
    message: '登录过期,请重新登录~'
  }
}

export const EXCEPTION_ARTICLE = {
  PUBLISH_FAILED: {
    code: 2001,
    message: '发布文章失败~'
  },

  GET_LIST_FAILED: {
    code: 2002,
    message: '没有更多文章了~'
  },

  UPDATE_FAILED: {
    code: 2003,
    message: '更新文章失败~'
  },

  UPDATE_FAILED_AUTH: {
    code: 2004,
    message: '您没有更新该文章的权限~'
  },

  NOT_FOUND: {
    code: 2005,
    message: '没有找到该文章~'
  }
}


export const EXCEPTION_COMMENT = {
  PUBLISH_FAILED: {
    code: 3001,
    message: '评论文章失败~'
  },

  GET_LIST_FAILED: {
    code: 3002,
    message: '没有更多评论了~'
  },
}
