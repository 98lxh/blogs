import { FC } from 'react';
import MDEditor from "md-editor-rt"
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "store/slices/system.slice";

const ArticleContent: FC<{ content: string }> = ({content}) => {
  const theme = useSelector(selectCurrentTheme)

  return (
    <div className="absolute top-[430px] left-2 w-[calc(100vw-30px)] text-base" >
      <MDEditor
        theme={theme === 'THEME_DARK' ? 'dark' : 'light'}
        previewTheme="vuepress"
        modelValue={content}
        previewOnly={true}
      />
  </div>)
}

export default ArticleContent
