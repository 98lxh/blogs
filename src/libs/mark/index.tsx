import { NextPage } from "next"

const Mark: NextPage<{ title: string, keyword: string }> = ({ title, keyword }) => {
  if (!keyword) return <>{title}</>
  const strArr = title.split(keyword)
  return (
    <>
      {
        strArr.map((str, index) => (
          <span key={index}>
            {str}
            {
              index === strArr.length - 1 
                ? null
                : <span className="text-main mr-[-5px]">{ keyword} </span>
            }
          </span>
        ))
      }
    </>
  )
}

export default Mark
