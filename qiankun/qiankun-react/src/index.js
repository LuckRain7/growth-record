import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// 进行判断，是否微前端运行 动态添加 publicPath
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// 如果没有微前端，则自己独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() { }

export async function mount() {
  render()
}

export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('root'))
}



