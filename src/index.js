import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import findIndivDistanceDurationReducer from './reducers/findIndivDistanceDurationReducer';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const store = createStore(findIndivDistanceDurationReducer);

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

const render = (Component) => {
  ReactDOM.render(
    <HashRouter>
      <Provider store={store}>
        <Component/>
      </Provider>
    </HashRouter>,
    document.getElementById('root')
  );
};

render(App);

/*eslint-disable */
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
/*eslint-enable */

serviceWorker.unregister();



// What was here previous to refactoring
// ReactDOM.render(<App />, document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
