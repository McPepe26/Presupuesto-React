import React, {useState} from 'react';
import PropTypes from 'prop-types'
import shortid from 'shortid';
import Error from './Error';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {
    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);
    

    //Cuando el usuario agrega un gasto
    const agregarGasto = (e) => {
        e.preventDefault();
        //Validar
        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            guardarError(true);
            return;
        }
        //Construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }
        //Pasar el gasto al componente principal
        guardarCrearGasto(true);
        guardarGasto(gasto);
        //Resetear el form
        guardarNombre('');
        guardarCantidad(0);
        guardarError(false);
    }

    return (
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos</h2>

            {error ? <Error mensaje="Ambos campos son obligatorios o Gasto incorrectos" /> : null}
            
            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="300"
                    value={isNaN(cantidad) ? '' : cantidad}
                    onChange={e => guardarCantidad(parseInt(e.target.value, 10))}
                />
            </div>

            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />
        </form>
    );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}

 
export default Formulario;