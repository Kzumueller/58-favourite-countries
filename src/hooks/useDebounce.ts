"use client"

import { useState, useEffect } from 'react'

/**
 * debounces, i.e. rate limits, state updates to they can be used to trigger expensive operations or just make UI components less jumpy
 * @param value
 * @param delay
 */
export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
