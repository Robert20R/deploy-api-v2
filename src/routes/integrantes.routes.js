import { Router } from 'express' // Create URL
import * as endPoints from '../controllers/integrantes.controller.js'

const router = Router()

// Ruta de acceso para la abstracción de todos los datos.
router.get('/integrantes', endPoints.getAllIntegrants)

// Ruta para insertar datos a la base de datos.
router.post('/integrantes', endPoints.createNewIntegrant)

// Ruta de acceso para la abstracción de los integrantes por Id.
router.get('/integrantes/:id', endPoints.getIntegrantById)

// Ruta de actualización de integrantes por ID.
router.put('/integrantes/:id', endPoints.updateIntegrant)

// Ruta para eliminar integrante por ID.
router.delete('/integrantes/:id', endPoints.deleteIntegrant)

// Ruta para traer un Search.
router.get('/integrantesSearch/:searchTerm', endPoints.getAllBySearch)

export default router
