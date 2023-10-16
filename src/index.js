// import libraries , components and context api
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContextProvider } from './contextApi/Context';


// pointing to the root element in the index html
const root = ReactDOM.createRoot(document.getElementById('root'));


// renderning componenets in the root 
root.render
(
  <>
    <ContextProvider>
      <App />
    </ContextProvider>
  </>
);


