import message from "libs/message";
import { EditorArticle } from "store/slices/editor.slice";

const errorMessageToEditorArticle = {
  title: '标题不能为空',
  content: '内容不能为空',
  categoryId: '请选择一个分类'
}

export const checkEditorArticle = (editorArticle: EditorArticle) => {
  let isVaild = true
  for (const key in editorArticle) {
    if (!editorArticle[key]) {
      message.error(errorMessageToEditorArticle[key])
      isVaild = false
      break
    }
  }

  return isVaild
}
