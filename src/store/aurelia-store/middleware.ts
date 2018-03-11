import { State } from '../common/state';

export const actionMiddleware = (currentState: State, originalState: State) => {

  if (currentState.actionLock) {
    let deny = !currentState.actionLock.allowedActions.includes(currentState.currentAction);
    if (deny) {
      alert(currentState.actionLock.message);
      return originalState;
    }
  }

  return currentState;
}
