import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

// CSS
import './index.css' 		            // v2	
//import './index_v1.css' 	        // Import your global styles here

// This targets the <div id="root"></div> inside your index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>,
)


