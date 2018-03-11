import { store } from './store';
import * as Mutations from './mutations';

export const viewDetails = (id: number) => {
  store.dispatch(Mutations.viewDetails, id);
}

export const editDetails = () => {
  store.dispatch(Mutations.editDetails);
}

export const cancelEditDetails = () => {
  store.dispatch(Mutations.cancelEditDetails);
}

export const saveDetails = async (entity: any) => {
  store.dispatch(Mutations.saveDetailsStart);

    try {
      // do some async stuff
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newEntity = { ...entity };

      store.dispatch(Mutations.saveDetailsSuccess, newEntity);
    }
    catch (error) {
      store.dispatch(Mutations.saveDetailsError, error.serverValidationErrors);
    }
}
