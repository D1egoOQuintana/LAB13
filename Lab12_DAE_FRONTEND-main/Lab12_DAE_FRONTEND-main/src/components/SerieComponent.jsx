import React from 'react';
import { useNavigate } from "react-router-dom";
import { deleteSerieService } from "../services/serieService";
function SerieComponent(props) {
    const navigate = useNavigate();

    const gotoUrl = (codigo) => {
        navigate("/series/edit/" + codigo);
    }
    const handleDelete = () => {
        if(window.confirm('¿Estás seguro de que quieres eliminar esta serie?')) {
            await deleteSerieService(codigo)
            const nLista = props.series.filter(item => item.id!== props.codigo);
            props.actualizarLista(nLista);
        }
    }

    return (
        <div className="card">
            <img src={props.imagen || "https://via.placeholder.com/300x150?text=Sin+Imagen"} className="card-img-top" alt={props.titulo} />
            <div className="card-body">
                <h5 className="card-title">{props.titulo}</h5>
                <p className="card-text">{props.descripcion}</p>
                <p className="card-text"><strong>Fecha de estreno:</strong> {props.fecha}</p>
                <p className="card-text"><strong>Rating:</strong> {props.rating}</p>
                <p className="card-text"><strong>Categoría:</strong> {props.categoria}</p>
                <div className="d-flex justify-content-between">
                    <button 
                        onClick={() => gotoUrl(props.codigo)} 
                        className="btn btn-secondary"
                    >
                        Editar
                    </button>
                    <button 
                        onClick={props.onDelete} 
                        className="btn btn-danger"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SerieComponent;