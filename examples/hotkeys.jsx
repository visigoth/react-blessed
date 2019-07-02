import React, {Component} from 'react';
import blessed from 'neo-blessed';
import {HotKeys, configure} from 'react-hotkeys';
import {createBlessedRenderer} from '../src';

const render = createBlessedRenderer(blessed);

configure({
  defaultComponent: 'element',
  defaultKeyEvent: 'keypress'
});

const keyMap = {
  quit: ['q']
};

class App extends Component {
  render() {
    const handlers = {
      quit: () => {process.exit();}
    };
    return (
      <HotKeys keyMap={keyMap} handlers={handlers}>
        <box label="react-blessed demo"
             border={{type: 'line'}}
             style={{border: {fg: 'cyan'}}}>
          This example uses neo-blessed fork of blessed library.
        </box>
      </HotKeys>
    );
  }
}

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'press q to quit'
});

const component = render(<App />, screen);
