import { createContext } from 'react'
import _ from 'lodash'

export const DesktopContext = createContext({
  getButtonHoverHandlers: _.noop,
  getCitationHoverHandlers: _.noop
})

export const GlobalContext = createContext({
  data: {}
})

