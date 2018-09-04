
import { define, setGlobalOptions, mergeStrategy, mergeOptions } from './options'
import { getCacheForData, destroyCache } from './cache'
import { getInstance } from './instance'
import { stats } from './stats'
import { callbacks } from './callbacks'

export * from './constants'
export * from './types'
export { stats }
export { callbacks }
export { define, setGlobalOptions, mergeStrategy, mergeOptions }
export { getCacheForData, destroyCache }
export default getInstance
