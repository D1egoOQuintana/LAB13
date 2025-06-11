import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function CategoryFormPage() {
    // 1. MODIFICACIÓN: Centralizamos la URL de la API.
    const urlApi = 'http://localhost:8000/series/api/v1/categories/';

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false); // Mantener para el spinner
    const [error, setError] = useState('');
    
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    // useEffect para cargar datos en modo edición
    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            // 2. MODIFICACIÓN: Usamos la nueva URL.
            axios.get(`${urlApi}${id}/`)
                .then(response => {
                    const { name, description } = response.data;
                    setName(name);
                    // 3. MEJORA: Asignamos el valor de la descripción o un string vacío si es null.
                    setDescription(description || ''); 
                    setLoading(false);
                })
                .catch(() => {
                    setError('No se pudo cargar la categoría para editar.');
                    setLoading(false);
                });
        }
    }, [id, isEditMode]); // Las dependencias están correctas

    const handleSubmit = (e) => {
        e.preventDefault();

        // Pequeña validación para no enviar un nombre vacío
        if (!name.trim()) {
            setError('El nombre de la categoría es obligatorio.');
            return;
        }

        setLoading(true);
        setError('');

        // Preparamos los datos a enviar.
        // En tu backend, el modelo tiene los campos "name" y "description".
        const categoryData = { name, description };

        // 4. MODIFICACIÓN: Usamos la nueva URL para crear o actualizar.
        const request = isEditMode
            ? axios.put(`${urlApi}${id}/`, categoryData) // PUT para actualizar
            : axios.post(urlApi, categoryData);             // POST para crear

        request
            .then(() => {
                setLoading(false);
                navigate('/categories'); // Redirigir a la lista tras el éxito
            })
            .catch((err) => {
                // Mejora: Mostrar un error más específico si es posible
                console.error("Error al guardar la categoría:", err);
                setError('No se pudo guardar la categoría. Por favor, intenta de nuevo.');
                setLoading(false);
            });
    };

    return (
        <div className="container mt-4">
            {/* El título cambia dinámicamente, ¡perfecto! */}
            <h2>{isEditMode ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
            
            {error && <div className="alert alert-danger">{error}</div>}

            {loading && !error ? ( // Solo muestra el spinner si no hay un error
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">Nombre</label>
                        <input
                            id="categoryName"
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoryDescription" className="form-label">Descripción</label>
                        <textarea
                            id="categoryDescription"
                            className="form-control"
                            rows="3"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-end gap-2"> {/* Usar gap para espaciar */}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/categories')}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Crear Categoría')}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default CategoryFormPage;