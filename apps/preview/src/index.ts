import debounce from './utils/debounce';
import { bundle } from './bundler/miniBundler';

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
  eval(bundledJs);
}

window.addEventListener('message', handleMessage, { once: true });
window.addEventListener('message', debounce(handleMessage, 500));
