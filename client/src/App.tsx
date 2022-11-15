import {Provider} from 'react-redux'
import { Shell } from './app-state/Shell';
import { createStore } from './app-state/Store'


const store = createStore();

const App = () => {
  return (
    <Provider store={store}>
      <Shell/>
    </Provider>
  )
}

export default App