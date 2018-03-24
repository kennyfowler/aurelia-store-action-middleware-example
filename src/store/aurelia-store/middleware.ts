import { State } from '../common/state';

export const applyActionLockMiddleware = (currentState: State, originalState: State, settings: any, action: any) => {
  
  if (currentState.actionLock) {
    let deny = !currentState.actionLock.allowedActions.includes(action.name);
    if (deny) {
      alert(currentState.actionLock.message);
      return originalState;
    }
  }

  return currentState;
}

export const releaseActionLockMiddleware = (currentState: State, originalState: State, settings: any, action: any) => {
  
  if (currentState.actionLock && currentState.actionLock.releaseActions) {
    let release = currentState.actionLock.releaseActions.includes(action.name);
    if (release) {
      currentState.actionLock = null;
    }
  }

  return currentState;
}
