import { combineReducers } from 'redux';
import { State, Action } from 'shared/interface';
import { authReducer } from 'shared/store/auth.reducer';

const appReducer = combineReducers({
	authState: authReducer
});

const rootReducer = (state: State | undefined, action: Action): any => {
	return appReducer(state, action);
};

export default rootReducer;
