import { FC, useMemo } from "react"

interface InputProps {
  type?: 'text' | 'textarea'
  value: string
  max?: number,
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void
}

const Input: FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  max
}) => {
  const currentValueLength = useMemo(() => value.length, [value])

  const inputProps = useMemo(() => ({
    className: "border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-main w-full",
    onChange: (evt: any) => onChange && onChange(evt.target.value),
    value: value,
    maxLength: max
  }),
    [value, max, onChange]
  )

  return (
    <div className="relative leading-none">
      {
        type === 'text'
        ? (
          <input  {...inputProps} />
        )
        : (
          <textarea {...inputProps} rows={5} />
        )
      }
      {/* 最大长度 */}
      {max && <span className={`absolute right-1 bottom-0.5 text-zinc-400 text-xs ${currentValueLength >= max && 'text-red-700'}`}>{currentValueLength}/{max}</span>}
    </div>
  )
}

export default Input
