import { State } from '../common/state';

export const getEntityById = (state: State, id: number): any => {
  return state.entities.find(entity => entity.id == id);
}
