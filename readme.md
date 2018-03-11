# Aurelia Example App

This example app is prototyping a small feature that allows to "lock" the app on the current state, and releasing the lock only by defined actions. This feature is helpful if you want to (globally) prevent the user to transit from any state to another.

In this example the user can select an entity from a list to view and edit its details. When editing the entity the user ist not allowed to select another entity from the list.

Because the state can only be changed by actions, a middleware is used to check if the current action is allowed to mutate the state.

The data for the lock is a simple object and saved to the state by the preceding action. In this example the edit action applies the following lock data:

```
actionLock: {
  allowedActions: [
    Types.CANCEL_EDIT_DETAILS,
    Types.SAVE_DETAILS,
    Types.SAVE_DETAILS_ERROR,
    Types.SAVE_DETAILS_SUCCESS
  ],
  message: 'Save or cancel editing before calling another action.'
}
```

It contains an array of actions that are allowed to pass, any other action will be revoked and a message will be displayed.

The middleware then checks if the current action is allowed to pass or not.

The lock is released by any of the allowed actions by simply setting the property to `null`.

## Redux approach

In redux the middleware receives the action object and may return `false` to ingore the action and thus the state is not mutated.

```
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
```

## Aurelia-Store approach

In aurelia-store we currently need to save the current action name to the state and setup the middleware **after** action processing. 

```
export const editDetails = (state: State) => {
  return {
    ...state,
    actionLock: {
      allowedActions: [
        editDetails.name,
        cancelEditDetails.name,
        saveDetailsStart.name,
        saveDetailsSuccess.name,
        saveDetailsError.name
      ],
      message: 'Save or cancel editing before calling another action.'
    },
    editEntity: true,
    currentAction: editDetails.name
  };
}
```

After an action is processed, even it was not allowed to, the middleware checks if it was allowed to mutate the state, if not, the original state will be returned.

```
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
```



