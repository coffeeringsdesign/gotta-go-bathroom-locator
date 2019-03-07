import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import middlewareLogger from './middleware/middleware-logger';
const cors = require('cors')({origin: true});

const store = createStore(rootReducer, applyMiddleware(middlewareLogger, thunkMiddleware));

// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// );

const render = (Component) => {
  ReactDOM.render(

      <Provider store={store}>
        <App />
      </Provider>,

    document.getElementById('root')
  );
};

render(App);

/*eslint-disable */
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}
/*eslint-enable */

serviceWorker.unregister();
