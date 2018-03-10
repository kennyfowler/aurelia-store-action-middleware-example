import { Container } from 'aurelia-framework';
import { Store as ReduxStore, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { State } from '../common/state';
import { reducer } from './reducer';
import { actionMiddleware } from './middleware';

export const store: ReduxStore<State> = createStore<State>(reducer, composeWithDevTools(
  applyMiddleware(
    thunk.withExtraArgument(Container.instance),
    actionMiddleware()
  )
));
