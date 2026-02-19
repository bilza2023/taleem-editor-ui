import { mount } from 'svelte'
import Editor from './lib/editor/Editor.svelte';
import './lib/css/app.css';

// Expose a factory instead of auto-mounting
// @ts-ignore
window.createTaleemEditor = (options) => {
  return mount(Editor, options);
};
