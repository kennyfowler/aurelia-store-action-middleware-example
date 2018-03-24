import { Container } from 'aurelia-framework';
import { Store as AureliaStore } from 'aurelia-store';
import { State } from '../common/state';

const store: AureliaStore<State> = Container.instance.get(AureliaStore);

export const viewDetails = (state: State, id: number) => {
  return {
    ...state,
    selectedEntityId: id
  };
}
store.registerAction(viewDetails.name, viewDetails);

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
      message: 'Save or cancel editing before calling another action.',
      releaseActions: [
        cancelEditDetails.name,
        saveDetailsSuccess.name
      ]
    },
    editEntity: true
  };
}
store.registerAction(editDetails.name, editDetails);

export const cancelEditDetails = (state: State) => {
  return {
    ...state,
    editEntity: false
  };
}
store.registerAction(cancelEditDetails.name, cancelEditDetails);

export const saveDetailsStart = (state: State) => {
  return {
    ...state,
    isProcessing: true,
    serverValidationErrors: null // clear errors from previous attempt
  };
}
store.registerAction(saveDetailsStart.name, saveDetailsStart);

export const saveDetailsSuccess = (state: State, newEntity: any) => {
  return {
    ...state,
    isProcessing: false,
    serverValidationErrors: null,
    editEntity: false,
    entities: state.entities.map(entity => entity.id == newEntity.id ? newEntity : entity)
  };
}
store.registerAction(saveDetailsSuccess.name, saveDetailsSuccess);

export const saveDetailsError = (state: State, serverValidationErrors: any) => {
  return {
    ...state,
    isProcessing: false,
    serverValidationErrors: serverValidationErrors
  };
}
store.registerAction(saveDetailsError.name, saveDetailsError);
