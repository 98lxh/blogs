import { updateArticle, publishArticle } from "api/article"

export const buildEditorInfo = (isUpdate: boolean) => {

  return ({
    successMessage: isUpdate ? '编辑成功,正在跳转至文章详情!' : '新建成功,正在跳转至文章详情!',
    requestAPI: isUpdate ? updateArticle : publishArticle,
    buttonText: isUpdate ? '更新文章' : '发布文章'
  })
}
