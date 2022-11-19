import {Provider} from 'react-redux'
import { Shell } from './app-state/Shell';
import { createStore } from './app-state/Store';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import {Theme} from "./common/components/toolkit/Theme";


const store = createStore();

const App = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={Theme}>
      <Shell/>
      </ThemeProvider>
    </Provider>
  )
}

export default App