export enum Types {
  VIEW_DETAILS = 'VIEW_DETAILS',
  EDIT_DETAILS = 'EDIT_DETAILS',
  CANCEL_EDIT_DETAILS = 'CANCEL_EDIT_DETAILS',
  SAVE_DETAILS = 'SAVE_DETAILS',
  SAVE_DETAILS_SUCCESS = 'SAVE_DETAILS_SUCCESS',
  SAVE_DETAILS_ERROR = 'SAVE_DETAILS_ERROR',
}

export const viewDetails = (id: number) => async (dispatch, getState, container) => {
  dispatch({
    type: Types.VIEW_DETAILS,
    id: id
  });
}

export const editDetails = () => async (dispatch, getState, container) => {
  dispatch({
    type: Types.EDIT_DETAILS
  });
}

export const cancelEditDetails = () => async (dispatch, getState, container) => {
  dispatch({
    type: Types.CANCEL_EDIT_DETAILS
  });
}

export const saveDetails = (entity: any) => async (dispatch, getState, container) => {
  dispatch({
    type: Types.SAVE_DETAILS
  });

  try {
    // do some async stuff
    await new Promise(resolve => setTimeout(resolve, 2000));
    const newEntity = { ...entity };

    dispatch({
      type: Types.SAVE_DETAILS_SUCCESS,
      entity: newEntity
    });
  }
  catch(error) {
    dispatch({
      type: Types.SAVE_DETAILS_ERROR,
      serverValidationErrors: error.serverValidationErrors
    });
  }
}
