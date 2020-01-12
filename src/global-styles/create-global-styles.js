import { set, unset, isObject, isString, isUndefined, isFunction } from 'lodash'
import broadcaster from 'mitt'

import { defaultTheme } from './themes'
import { cssVariableTransformer } from './transformers'
import { merge, equal } from './utils'

export function createGlobalStyles(initialState = {}) {
  const state = {}
  const defaultState = merge(defaultTheme, initialState)
  const themeState = {}
  const userState = {}
  const variables = {}

  const plugins = []
  const transformers = []

  const broadcast = broadcaster()

  const getState = () => ({ ...state })
  const getVariables = () => ({ ...variables })

  const composeStateWithPlugins = composeState(plugins)
  const composeVariablesWithTransformers = composeState(transformers)

  const render = () => {
    const precomposedState = merge(defaultState, themeState)
    const composedState = composeStateWithPlugins(precomposedState)
    const mergedState = merge(composedState, themeState)

    const nextState = merge(mergedState, userState)
    const nextVariables = composeVariablesWithTransformers(nextState)

    applyNextState(state, nextState, () => {
      applyNextState(variables, nextVariables)
      broadcast.emit('UPDATE_STATE', state)
    })
  }

  const addPlugin = plugin => {
    plugins.push(plugin)
    transformers.push(plugin)
    render()
  }

  const addTransformer = transformer => {
    transformers.push(transformer)
    render()
  }

  const apply = (nextThemeState = {}) => {
    applyNextState(themeState, nextThemeState, render)
  }

  const setProps = (nextUserState = {}, setValue) => {
    let nextState = { ...userState }

    if (isString(nextUserState) && !isUndefined(setValue)) {
      nextState = set(nextState, nextUserState, setValue)
    }
    if (isObject(nextUserState)) {
      nextState = merge(nextState, nextUserState)
    }

    applyNextState(userState, nextState, render)
  }

  const unsetProps = unsetUserState => {
    if (!isString(unsetUserState)) return

    const nextUserState = unset(userState, unsetUserState)

    applyNextState(userState, nextUserState, render)
  }

  const getCssString = () => {
    const template = []
    const vars = getVariables()
    const keys = Object.keys(vars)

    template.push(`:root {`)

    keys.forEach(key => {
      const value = vars[key]
      template.push(`  ${key}: ${value};`)
    })

    template.push(`}`)

    const css = template.join('\n')

    return css
  }

  const getHtmlString = () => {
    const template = []
    const vars = getVariables()
    const keys = Object.keys(vars)

    template.push(`<style>`)
    template.push(`  :root {`)

    keys.forEach(key => {
      const value = vars[key]
      template.push(`    ${key}: ${value};`)
    })

    template.push(`  }`)
    template.push(`</style>`)

    const html = template.join('\n')

    return html
  }

  const subscribe = callback => {
    if (isFunction(callback)) {
      broadcast.on('UPDATE_STATE', callback)
    }
  }

  const unsubscribe = callback => {
    if (isFunction(callback)) {
      broadcast.off('UPDATE_STATE', callback)
    }
  }

  /**
   * Default transformers
   */
  addTransformer(cssVariableTransformer)

  return {
    getState,
    addPlugin,
    addTransformer,
    apply,
    setProps,
    unsetProps,
    getVariables,
    getHtmlString,
    getCssString,
    subscribe,
    unsubscribe,
  }
}

function composeState(fns = []) {
  return state => {
    return fns.reduceRight((nextState, fn) => {
      try {
        return fn(nextState)
      } catch {
        return nextState
      }
    }, state)
  }
}

function applyNextState(prevState = {}, nextState = {}, callback) {
  if (!equal(prevState, nextState)) {
    Object.assign(prevState, nextState)

    if (isFunction(callback)) {
      callback(nextState)
    }
  }
}
