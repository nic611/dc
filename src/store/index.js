import configureStore from './configureStore'
import rootSaga from '$module/sagaIndex'
import ReducerRegistry from './reducerRegistry'
import * as coreReducers from '../module/reducerIndex'

const reducerRegistry = new ReducerRegistry(coreReducers)

const store = configureStore(reducerRegistry)
// 启动saga
store.runSaga(rootSaga)
store.reducerRegistry = reducerRegistry
window.$store = store

export default store
