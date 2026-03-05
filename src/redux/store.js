import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import userReducer from './reducers';

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  userReducer: persistReducer(persistConfig, userReducer),
});

const Store = createStore(rootReducer, applyMiddleware(thunk));
const persistor = persistStore(Store);

export { Store, persistor };
