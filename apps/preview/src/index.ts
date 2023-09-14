import { debounce } from './utils';
import { bundle } from './bundler/miniBundler';
import { Hook, Decode } from 'console-feed';

window.onerror = function (message, source, lineno, colno, error) {
  const errorLog = {
    method: 'error',
    data: [message as string, '__console_feed_remaining__0'],
  };
  window.parent.postMessage({ type: 'ERROR', log: Decode([errorLog]) }, '*');
};
Hook(window.console, log => {
  window.parent.postMessage({ type: 'LOG', log: Decode(log) }, '*');
});

function handleMessage(e): void {
  const { files, entryFilePath } = e.data;

  if (!files) return;
  const html = files.find(file => file.path === './index.html/');
  const css = files.find(file => file.path === './index.css/');

  // Adding html
  document.body.innerHTML = html.content;

  // Adding css
  const style = document.head.querySelector('style');
  if (style !== null) {
    style.innerHTML = css.content;
  }

  // Adding Js
  const bundledJs = bundle(files, entryFilePath);
  if (bundledJs) {
    eval(bundledJs);
  }
}

window.addEventListener('message', handleMessage, { once: true });
window.addEventListener('message', debounce(handleMessage, 500));
