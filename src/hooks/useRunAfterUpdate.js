import {useRef, useLayoutEffect} from 'react'

// https://bit.ly/3h1a36K
export default function useRunAfterUpdate() {
  const afterPaintRef = useRef(null)

  useLayoutEffect(() => {
    if (afterPaintRef.current) {
      afterPaintRef.current()
      afterPaintRef.current = null
    }
  })

  const runAfterUpdate = fn => (afterPaintRef.current = fn)
  return runAfterUpdate
}
