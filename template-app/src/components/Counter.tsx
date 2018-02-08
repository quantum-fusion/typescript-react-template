import * as React from 'react';
import { WithStyles, withStyles, Paper } from 'material-ui';
import { Text, BaseStyleProps, NumberInput, NumberInputProps, LabeledButton } from './shared';
import { Theme } from 'material-ui/styles';
import { defineMessages, FormattedMessage } from 'react-intl';

// Localizable strirngs 
const messages = defineMessages({
  current_counter_label: {
    id: "current_counter_label",
    defaultMessage: "The current counter is" ,
  },
  counter_label: { 
    id: "counter_label",
    defaultMessage: "counter",
  },
  increment: {
    id: "increment",
    defaultMessage: "increment",
  },
  decrement: {
    id: "decrement",
    defaultMessage: "decrement",
  },
  undo: {
    id: "undo",
    defaultMessage: "undo",
  },
  redo: {
    id: "decrement",
    defaultMessage: "redo",
  }
});

// Styles 
const styles = (theme: Theme) => ({
  root: {
    backgroundColor: 'red',
  },
  theme1: {
    backgroundColor: 'blue',
  }
} as React.CSSProperties);

// Properties
export type CounterProps = WithStyles<'root'|'theme1'> & {
  value: number;
  change: (value: number) => void;
  undo: () => void;
  redo: () => void;
}

// Helper component
export class CounterDisplay extends React.PureComponent<CounterProps> {
  render(): React.ReactNode {
     return (
        <Text type="display1">
          <FormattedMessage {...messages.current_counter_label}/>: {this.props.value}
        </Text>
    );
  }
}

// Main presentation component: without styles
export class UnstyledCounter extends React.PureComponent<CounterProps> {
  render() {
    const inc = () => this.props.change(this.props.value + 1);
    const dec = () => this.props.change(this.props.value - 1);
    const undo = () => this.props.undo();
    const redo = () => this.props.redo();
    return (
       <Paper elevation={4}>
        <div>
          <CounterDisplay {...this.props}/>
          <NumberInput label={messages.counter_label} {...this.props}/>
        </div>
        <div>
          <LabeledButton label={messages.increment} click={inc} {...this.props}/>
          <LabeledButton label={messages.decrement} click={dec} {...this.props}/>
        </div>
        <div>
           <LabeledButton label={messages.undo} click={undo} {...this.props}/>
           <LabeledButton label={messages.redo} click={redo} {...this.props}/>
        </div>
      </Paper>
    );
  }
}

// Applies the specified styles 
export const Counter = withStyles(styles)(UnstyledCounter);