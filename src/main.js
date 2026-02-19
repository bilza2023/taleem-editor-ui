

import { mount } from 'svelte'
import Editor from './lib/editor/Editor.svelte';
import './lib/css/app.css';

mount(Editor, {
  target: document.getElementById('app')
})
