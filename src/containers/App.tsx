import * as React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { createLogger } from 'redux-logger';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { createMuiTheme, List, ListItem, ListItemText } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Theme } from 'material-ui/styles';

import { MainPage } from '../components/MainPage';
import { CounterForm } from '../components/CounterForm';
import { CounterContainer, counterReducer } from '../components/Counter/';
import { Text, LabeledButton } from '../components/ui-shared/';
 
const rootReducer = combineReducers({
    counter: counterReducer,
    form: formReducer,
  })

const themeOverrides = {
  MuiPaper: {
    root: {
      padding: '10px'
    }
  }
}

const lightTheme = createMuiTheme({
  palette: { type: 'light' },
  overrides: themeOverrides, 
});

const darkTheme = createMuiTheme({
  palette: { type: 'dark' },
  overrides: themeOverrides, 
});


const logger = createLogger({});

// logger must be the last middleware in chain, otherwise it will log thunk and promise, not actual actions 
const middleware = applyMiddleware(logger);

const store = createStore(rootReducer, middleware);

export type AppProperties = { }

// Theme information is stored in app state. Optionally this could have been added 
// as its own reducer, but it would have added a lot of additional complexity for a simple string value
// This is the simplest thing that could have worked 
export type AppState = { theme: Theme };


export class App extends React.PureComponent<AppProperties, AppState> 
{
  state: AppState = { theme: lightTheme }
  setLightTheme() { this.setState({ theme: lightTheme }); }
  setDarkTheme() { this.setState({ theme: darkTheme }); }
  render(): React.ReactNode 
  {
    const header = (<Text type="display2">Welcome to my first TypeScript React/Redux Application</Text>);

    const sidebar = (
      <List component="nav">  
        <ListItem button onClick={e => this.setLightTheme()}>
          <ListItemText primary="light"/>
        </ListItem>
        <ListItem button onClick={e => this.setDarkTheme()}>
          <ListItemText primary="dark"/>
        </ListItem>
      </List>
    );
    const content = (<div><CounterContainer/><CounterForm/></div>);

    return (
      <Provider store={store}>
      <IntlProvider locale="en">
        <MuiThemeProvider theme={this.state.theme}>
          <MainPage
            content={content}
            sidebar={sidebar}
            header={header}
          />
        </MuiThemeProvider>
      </IntlProvider>
    </Provider>);
  }
}

