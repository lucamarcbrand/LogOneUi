import { createStore } from "redux";
import rootReducer from './reducers/reducers';
// pass root reducer to create application store
export default createStore(rootReducer);