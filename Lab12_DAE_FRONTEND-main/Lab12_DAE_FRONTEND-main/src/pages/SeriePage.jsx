// src/pages/SeriePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SerieComponent from '../components/SerieComponent';

function SeriePage() {
    // 1. MODIFICACIÓN: Centralizamos la URL de la API para series.
    const urlApi = 'http://localhost:8000/series/api/v1/series/';

    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchSeries();
    }, []);

    const fetchSeries = () => {
        setLoading(true);
        // 2. MODIFICACIÓN: Usamos la nueva URL.
        axios.get(urlApi)
            .then(response => {
                setSeries(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al cargar las series:", error);
                setError('No se pudieron cargar las series.');
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta serie?')) {
            // 3. MODIFICACIÓN: Usamos la nueva URL para el borrado.
            axios.delete(`${urlApi}${id}/`)
                .then(() => {
                    // Refrescamos la lista de series tras el borrado exitoso
                    fetchSeries();
                })
                .catch((error) => {
                    console.error("Error al eliminar la serie:", error);
                    setError('No se pudo eliminar la serie.');
                });
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Series</h1>
                <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/series/new')}
                >
                    Nueva Serie
                </button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {series.length === 0 ? (
                        <div className="col-12">
                            <div className="alert alert-info">
                                No hay series disponibles. ¡Crea una nueva!
                            </div>
                        </div>
                    ) : (
                        series.map(serie => (
                            <div className="col-md-4 mb-3" key={serie.id}>
                                <SerieComponent 
                                    codigo={serie.id}
                                    titulo={serie.title}
                                    descripcion={serie.description}
                                    fecha={serie.release_date}
                                    rating={serie.rating}
                                    categoria={serie.category.name} // Esto funciona gracias a tu serializer. ¡Bien hecho!
                                    imagen={serie.image_url}
                                    onDelete={() => handleDelete(serie.id)}
                                />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default SeriePage;