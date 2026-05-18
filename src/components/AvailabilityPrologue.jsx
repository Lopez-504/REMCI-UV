import React from 'react';

//CSS
import './availabilityPrologue.css'

function AvailabilityPrologue () {
  return (
    <div className='availability-prologue'>
      <h2>Availability Dashboard</h2>  
      <p>
        (Under construction) Para graficar, seleccione los siguientes atributos: 
        <ol>
          <li>Estación</li>
          <li>Variable(s)</li>
            <ul>
              <li>Color</li>  
              <li>Tipo de gráfico</li>  
            </ul>
          <li>Rango temporal</li>
          <li>Resolución temporal</li>
        </ol>        
        En caso de quitar variables utilizando <button>✖</button>, restaurar manualmente la gráfica 
        con los botones internos (esquina superior derecha). [Esto se corregirá más adelante]
      </p>
    </div>
  )
}

export default AvailabilityPrologue