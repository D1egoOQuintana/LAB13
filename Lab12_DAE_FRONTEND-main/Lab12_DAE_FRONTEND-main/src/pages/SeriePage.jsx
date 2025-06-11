// src/pages/SeriePage.jsx
import {Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SerieComponent from '../components/SerieComponent';
import { getAllSerieService } from '../services/serieServices'; // Importamos el servicio para obtener series
//Tests
function SeriePage() {
    // 1. MODIFICACIÓN: Centralizamos la URL de la API para series.
    const urlApi = 'http://localhost:8000/series/api/v1/series/';

    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loadData = async () => {
        const resp = await getAllSerieService();
        setSeries(resp.data);
    };
    useEffect(() => {
        loadData();
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
                        series.map((serie) => (
                            <div key={serie.id} className="col-md-3 mb-3">
                                <SerieComponent
                                    codigo={serie.id}
                                    nombre={serie.name}
                                    categoria={serie.category_description}
                                    imagen={"serie.png"}
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