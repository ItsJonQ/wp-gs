import React, { useEffect } from 'react'
import { Controls, useControls } from '@itsjonq/controls'
import {
  globalStyles,
  useGlobalStylesState,
  useInjectGlobalStyles,
} from './global-styles'
import { TypographyBlock } from './blocks/typography'

function App() {
  useInjectGlobalStyles()
  useColorControls()
  useFontControls()

  return (
    <div className="App">
      <Controls />
      <TypographyBlock />
    </div>
  )
}

function useFontControls() {
  const globalStylesState = useGlobalStylesState()
  const { range } = useControls()

  const config = {
    fontSizes: {
      base: range('fontSizes.base', globalStylesState.fontSizes.base, {
        min: 11,
        max: 21,
      }),
    },
    fontScale: range('fontScale', globalStylesState.fontScale, {
      min: 1.1,
      max: 1.45,
      step: 0.05,
    }),
  }

  useEffect(() => {
    globalStyles.setProps(config)
  }, [config])
}

function useColorControls() {
  const globalStylesState = useGlobalStylesState()
  const { color } = useControls()
  const colors = globalStylesState.colors || {}

  const configColors = Object.keys(colors).reduce((collection, key) => {
    const value = globalStylesState.colors[key]
    return {
      ...collection,
      [key]: color(`colors.${key}`, value),
    }
  }, {})

  useEffect(() => {
    globalStyles.setProps({
      colors: configColors,
    })
  }, [configColors])
}

const loggerPlugin = state => {
  console.log('UPDATE', state)
  return state
}

globalStyles.addTransformer(loggerPlugin)

export default App
