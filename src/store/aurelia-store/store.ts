import { Container } from 'aurelia-framework';
import { Store as AureliaStore, MiddlewarePlacement } from 'aurelia-store';
import { State } from '../common/state';
import { applyActionLockMiddleware, releaseActionLockMiddleware } from './middleware';

const store: AureliaStore<State> = Container.instance.get(AureliaStore);

store.registerMiddleware(applyActionLockMiddleware, MiddlewarePlacement.After);
store.registerMiddleware(releaseActionLockMiddleware, MiddlewarePlacement.After);

export {
  store
}
