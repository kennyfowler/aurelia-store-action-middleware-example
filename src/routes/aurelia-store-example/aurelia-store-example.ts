import { autoinject } from "aurelia-framework";
import { Store as AureliaStore } from 'aurelia-store';
import { Subscription } from 'rxjs/Subscription';
import { State, initialState } from '../../store/common/state';
import * as AureliaStoreActions from '../../store/aurelia-store/actions';
import * as Selectors from '../../store/common/selectors';

@autoinject()
export class AureliaStoreExample {

  private store: AureliaStore<State>;

  private subscription: Subscription;

  public state: State = initialState;

  private selectedEntity: any = null;

  constructor(store: AureliaStore<State>) {
    this.store = store;
  }

  private stateChanged = (newState: State): void => {

    // spy on changes...
    if (newState.selectedEntityId != this.state.selectedEntityId) {
      if (newState.selectedEntityId) {
        this.selectedEntity = { ...Selectors.getEntityById(newState, newState.selectedEntityId) };
      } else {
        this.selectedEntity = null;
      }
    }

    this.state = newState;
  }

  private viewDetails(id: number): void {
    AureliaStoreActions.viewDetails(id);
  }

  private editDetails(): void {
    AureliaStoreActions.editDetails();
  }

  private cancelEditDetails(): void {
    AureliaStoreActions.cancelEditDetails();
  }

  private async saveDetails(entity: any): Promise<void> {
    AureliaStoreActions.saveDetails(entity);
  }

  public bind(): void {
    this.subscription = this.store.state.subscribe(this.stateChanged);
  }

  public unbind(): void {
    this.subscription.unsubscribe();
  }
}
