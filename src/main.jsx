// Importa a biblioteca React, que é necessária para criar componentes React
import React from 'react'
// Importa a biblioteca ReactDOM, que é usada para renderizar componentes React no DOM
import ReactDOM from 'react-dom/client'
// Importa o componente Home da pasta 'pages'
import Home from './pages/Home'
// Importa o arquivo de estilos CSS global
import './index.css'

// Usa o método createRoot da biblioteca ReactDOM para criar uma raiz no elemento DOM com o ID 'root'
// Em seguida, renderiza o componente Home dentro de React.StrictMode para fornecer verificações adicionais e avisos
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)