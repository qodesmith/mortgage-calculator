import useRunAfterUpdate from 'hooks/useRunAfterUpdate'
import Input from 'components/Input'
import {cn} from 'helpers'
import {useState} from 'react'

export default function SlidingInput({
  value,
  onChange,
  label,
  className,
  type = 'text',
  options,
  ...inputProps
}) {
  const [listValue, setListValue] = useState('')

  // const runAfterUpdate = useRunAfterUpdate()
  const handleChange = e => {
    const {target} = e
    const {selectionStart, value: val} = target
    const [newText, newCursor] = filterInput(val, selectionStart)
    const newValue = type === 'number' ? val : +newText

    onChange(+newValue)
    if (options != null) {
      setListValue('')
    }

    // runAfterUpdate(() => {
    //   target.selectionStart = newCursor
    //   target.selectionEnd = newCursor
    // })
  }

  const handleListChange = e => {
    const {value: val} = e.target
    const [value, newCursor] = filterInput(val, 0)
    const newValue = type === 'number' ? val : +value

    setListValue(val)
    onChange(+newValue)
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
      {options != null && (
        <select value={listValue} onChange={handleListChange}>
          <option value="">Choose a price</option>
          {options.map(value => (
            <option key={value} value={value}>
              {value.toLocaleString()}
            </option>
          ))}
        </select>
      )}
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
