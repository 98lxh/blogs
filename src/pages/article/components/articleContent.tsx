import { NextPage } from 'next'
import MDEditor from "md-editor-rt"
import { useSelector } from 'react-redux';
import { selectThemeType } from 'store/slices/system.slice';
import 'md-editor-rt/lib/style.css';

const ArticleContent: NextPage<{ content: string,status:string }> = ({content,status}) => {
  const theme = useSelector(selectThemeType)

  return (
    <div
      className="absolute top-[350px] left-[20px] w-[calc(100vw-30px)] text-base duration-1000"
      style={status === 'in' ? { top: '100vh' } : {}}
    >
      <MDEditor
        theme={theme === 'THEME_DARK' ? 'dark' : 'light'}
        modelValue={content}
        previewOnly={true}
      />
  </div>)
}

export default ArticleContent
