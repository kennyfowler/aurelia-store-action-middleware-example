import { Container } from 'aurelia-framework';
import { Store as AureliaStore, MiddlewarePlacement } from 'aurelia-store';
import { State } from '../common/state';
import { actionMiddleware } from './middleware';

const store: AureliaStore<State> = Container.instance.get(AureliaStore);

store.registerMiddleware(actionMiddleware, MiddlewarePlacement.After);

export {
  store
}
