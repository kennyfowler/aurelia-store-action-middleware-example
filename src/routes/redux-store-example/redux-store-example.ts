import { inject } from 'aurelia-framework';
import { Store as ReduxStore } from 'redux';
import { State, initialState } from '../../store/common/state';
import * as ReduxActions from '../../store/redux-store/actions';
import * as Selectors from '../../store/common/selectors';

@inject('ReduxStore')
export class ReduxStoreExample {

  private store: ReduxStore<State>;

  private unsubscribeStore: Function;

  private state: State = initialState;

  private selectedEntity: any = null;

  constructor(store: ReduxStore<State>) {
    this.store = store;
  }

  private stateChanged = (): void => {
    const newState = this.store.getState();

    // spy on changes...
    if(newState.selectedEntityId != this.state.selectedEntityId) {
      if(newState.selectedEntityId) {
        this.selectedEntity = { ...Selectors.getEntityById(newState, newState.selectedEntityId) };
      } else {
        this.selectedEntity = null;
      }
    }

    this.state = newState;
  }

  private viewDetails(id: number): void {
    this.store.dispatch(ReduxActions.viewDetails(id));
  }

  private editDetails(): void {
    this.store.dispatch(ReduxActions.editDetails());
  }

  private cancelEditDetails(): void {
    this.store.dispatch(ReduxActions.cancelEditDetails());
  }

  private saveDetails(entity: any): void {
    this.store.dispatch(ReduxActions.saveDetails(entity));
  }

  public bind(): void {
    this.unsubscribeStore = this.store.subscribe(this.stateChanged);
    this.stateChanged();
  }

  public unbind(): void {
    this.unsubscribeStore();
  }
}
