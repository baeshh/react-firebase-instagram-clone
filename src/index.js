/** @format */

import ReactDOM from 'react-dom';

import App from './App';
import { AuthProvider } from './Firebase/authContext';
import { UploadProvider } from './Firebase/uploadContext';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <AuthProvider>
    <UploadProvider>
      <App />
    </UploadProvider>
  </AuthProvider>,
  rootElement
);
