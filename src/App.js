import React,{useState,useEffect, Fragment } from 'react';

function Cita({cita, index,eliminarCita}){
  return(
    <div className="cita">
      <p>Mascota: <span>{cita.mascota}</span></p>
      <p>Dueño:<span>{cita.propietario}</span></p>
      <p>Fecha:<span>{cita.fecha}</span></p>
      <p>Hora:<span>{cita.hora}</span></p>
      <p>Sintomas:<span>{cita.sintomas}</span></p>
      <button 
        onClick = {()=> eliminarCita (index)}
      type="button" className="button eliminar u-full-width">Eliminar x</button>
    </div>
  )
}

function Formulario({crearcita}){

  const stateIncicial = {
    mascota:'',
    propietario:'',
    fecha: '',
    hora:'',
    sintomas:''
  }

  const [cita, actualizarcita, ] = useState(stateIncicial)

  const handleChange =(e)=>{
    actualizarcita({
      ...cita,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    //pasar la cita al componente principal 
      crearcita(cita)

    // reiniciar el State
    actualizarcita(stateIncicial)

  }


  

  

  return (
    <Fragment>
      <h2>Crear Cita</h2>

        <form onSubmit={handleSubmit}>
                    <label>Nombre Mascota</label>
                    <input 
                      type="text" 
                      name="mascota"
                      className="u-full-width" 
                      placeholder="Nombre Mascota" 
                      onChange= {handleChange}
                      value={cita.mascota}
                    />

                    <label>Nombre Dueño</label>
                    <input 
                      type="text" 
                      name="propietario"
                      className="u-full-width"  
                      placeholder="Nombre Dueño de la Mascota" 
                      onChange= {handleChange}
                      value={cita.propietario}
                    />

                    <label>Fecha</label>
                    <input 
                      type="date" 
                      className="u-full-width"
                      name="fecha"
                      onChange= {handleChange}
                      value={cita.fecha}
                    />               

                    <label>Hora</label>
                    <input 
                      type="time" 
                      className="u-full-width"
                      name="hora" 
                      onChange= {handleChange}
                      value={cita.hora}
                    />

                    <label>Sintomas</label>
                    <textarea 
                      className="u-full-width"
                      name="sintomas"
                      onChange= {handleChange}
                      value={cita.sintomas}
                    ></textarea>

                    <button type="submit" className="button-primary u-full-width">Agregar</button>
            </form>
    </Fragment>
  )
}

const App = () => {

  let citasIniciales = JSON.parse(localStorage.getItem('citas'))

  if(!citasIniciales){
    citasIniciales =[]
  }

  const [citas, guardarCita] = useState(citasIniciales)

  const crearcita = cita =>{
    const nuevasCitas =[...citas, cita]
    
    guardarCita(nuevasCitas)
  }

  //Elimina la Cita del State
  const eliminarCita = index =>{
    const nuevasCitas = [...citas]
    nuevasCitas.splice(index, 1)
    guardarCita(nuevasCitas)
  }
  
  useEffect(()=>{
      
      let citasIniciales = localStorage.getItem('citas')
      if(citasIniciales){
        localStorage.setItem('citas', JSON.stringify(citas))
      }else{
        localStorage.setItem('ciyas', JSON.stringify([]))
      }

    }, [citas]
  )


  //Cargar Condicionalmen titulo

  const titulo =Object.keys(citas).length === 0 ? 'No hay Citas': "administar las citas aqui"



  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container"> 
        <div className="row">
          <div className="one-half column">
              <Formulario
                crearcita={crearcita}
              />
          </div>
          <div className="one-half column">
            <h2>
              {titulo}
            </h2>
              {citas.map((cita, index)=>(
                <Cita 
                key={index}
                index={index}
                cita={cita}
                eliminarCita={eliminarCita}
                />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;