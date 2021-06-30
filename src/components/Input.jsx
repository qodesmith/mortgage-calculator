import {useMemo} from 'react'
import {uuid} from 'helpers'

export default function Input({
  label,
  inputType = 'text',
  value,
  onChange,
  ...inputProps
}) {
  const id = useMemo(() => `a${uuid()}`, [])

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={inputType}
        value={value}
        onChange={onChange}
        {...inputProps}
      />
    </>
  )
}
