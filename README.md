## 页面即路由

### index路由
pages/index => /
pages/blog/index => /blog


### 嵌套路由:
pages/blog/first-post => /blog/first-post
pages/blog/first-post/comments => /blog/first-post/comments



### 动态路由
pages/blog/[slug] => /blog/:slug
pages/[username]/settings => /blog/:username/settings
pages/post/[...all].js => /post/*


## 配置 alias


