import { State } from '../common/state';

export function actionMiddleware() {
	return ({ dispatch, getState }) => next => action => {

    const state: State = getState();

    if(state.actionLock) {
      let deny = !state.actionLock.allowedActions.includes(action.type);
      if(deny) {
        alert(state.actionLock.message);
        return false;
      }
    }

    return next(action);
	};
}
