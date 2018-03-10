import { State, initialState } from '../common/state';
import { Types } from './actions';

export const reducer = (state: State = initialState, action) => {

  switch (action.type) {
    case Types.VIEW_DETAILS:
      return {
        ...state,
        selectedEntityId: action.id
      };

    case Types.EDIT_DETAILS:
      return {
        ...state,
        actionLock: {
          allowedActions: [
            Types.CANCEL_EDIT_DETAILS,
            Types.SAVE_DETAILS,
            Types.SAVE_DETAILS_ERROR,
            Types.SAVE_DETAILS_SUCCESS
          ],
          message: 'Save or cancel editing before calling another action.'
        },
        editEntity: true
      };

    case Types.CANCEL_EDIT_DETAILS:
      return {
        ...state,
        actionLock: null,
        editEntity: false
      };

    case Types.SAVE_DETAILS:
      return {
        ...state,
        isProcessing: true,
        serverValidationErrors: null // clear errors from previous attempt
      };

    case Types.SAVE_DETAILS_SUCCESS:
      return {
        ...state,
        isProcessing: false,
        serverValidationErrors: null,
        actionLock: null,
        editEntity: false,
        entities: state.entities.map(entity => entity.id == action.entity.id ? action.entity: entity)
      };

    // keep action lock and stay in edit form
    case Types.SAVE_DETAILS_ERROR:
      return {
        ...state,
        isProcessing: false,
        serverValidationErrors: action.serverValidationErrors
      };
  }

  return state;
}
