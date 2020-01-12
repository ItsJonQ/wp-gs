import flatten from 'flat'

export function cssVariableTransformer(state) {
  const flattenedState = flatten(state)
  const keys = Object.keys(flattenedState)

  const cssVariableData = keys.reduce((data, key) => {
    const value = flattenedState[key]
    const renamedKey = key.replace(/\./g, '-')
    const prefix = '--wp-gs'

    const enhancedKey = `${prefix}-${renamedKey}`

    return {
      ...data,
      [enhancedKey]: value,
    }
  }, {})

  return cssVariableData
}
