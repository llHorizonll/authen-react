import { configure } from '@storybook/react';
import { configure as viewFunction } from '@storybook/addon-viewport';
import { setOptions } from '@storybook/addon-options';

const req = require.context("../src/stories", true, /.index.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

setOptions({
  name: "test",
  addonPanInRight: true,
  sidebarAnimations: false
});

configure(loadStories, module);

viewFunction({
  defaultViewport: "iphone6"
})