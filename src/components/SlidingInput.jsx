import useRunAfterUpdate from 'hooks/useRunAfterUpdate'
import Input from 'components/Input'
import {cn} from 'helpers'

export default function SlidingInput({
  value,
  onChange,
  label,
  className,
  type = 'text',
  ...inputProps
}) {
  // const runAfterUpdate = useRunAfterUpdate()
  const handleChange = e => {
    const {target} = e
    const {selectionStart, value: val} = target
    const [newText, newCursor] = filterInput(val, selectionStart)
    const newValue = type === 'number' ? val : +newText

    onChange(+newValue)

    // runAfterUpdate(() => {
    //   target.selectionStart = newCursor
    //   target.selectionEnd = newCursor
    // })
  }

  return (
    <div className={cn('dif flex-col', {[className]: className})}>
      <Input
        value={value.toLocaleString()}
        onChange={handleChange}
        label={label}
        type={type}
        {...inputProps}
      />
      <input
        value={value}
        onChange={handleChange}
        {...inputProps}
        type="range"
      />
    </div>
  )
}

const strip = value => (value.match(/[0-9]/g) ?? []).join('')

// https://bit.ly/3h1a36K
function filterInput(value, cursor) {
  const beforeCursor = value.slice(0, cursor)
  const afterCursor = value.slice(cursor, value.length)
  const filteredBeforeCursor = strip(beforeCursor)
  const filteredAfterCursor = strip(afterCursor)
  const newText = filteredBeforeCursor + filteredAfterCursor
  const newCursor = filteredBeforeCursor.length

  return [newText, newCursor]
}
