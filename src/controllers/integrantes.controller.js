/* eslint-disable camelcase */
import { getConnection } from '../dataBase/connection.js'
import { queriesIntegrants } from '../dataBase/querysIntegrants.js'
import { body, validationResult } from 'express-validator'

// Reglas de validación.
const validationRulesIntegrantes = [
  body('nombre_integrante')
    .trim()
    .notEmpty()
    .withMessage('El nombre del integrante es requerido.'),
  body('profesion').trim().notEmpty().withMessage('La profesion es requerida.'),
  body('dependencia')
    .trim()
    .notEmpty()
    .withMessage('La dependencia es requerida.'),
  body('email').trim().notEmpty().withMessage('El correo es requerido.'),
  body('experiencia_conocimiento')
    .trim()
    .notEmpty()
    .withMessage('Las experiencias son requeridas.')
]

// EndPoint que trae todos los registros de la tabla integrandes.
export const getAllIntegrants = async (req, res) => {
  try {
    const pool = await getConnection()
    const connection = await pool.promise()
    const [result] = await connection.query(queriesIntegrants.getAllIntegrants)

    // Transforma los datos obtenidos a la estructura deseada
    const transformedResult = {
      Search: result.map((integrant) => ({
        id: integrant.id,
        nombre_integrante: integrant.nombre_integrante,
        profesion: integrant.profesion,
        dependencia: integrant.dependencia,
        email: integrant.email,
        experiencia_conocimiento: integrant.experiencia_conocimiento
      }))
    }

    res.json(transformedResult)

    if (result.affectedRows === 0) {
      // Asegúrate de que esta línea no se ejecute después de enviar la respuesta
      res.send('No results')
      return res.status(404).json({ error: 'Integrant not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error obtaining registers' })
  }
}

// EndPoint para agregar nuevos integrantes a la base de datos.
export const createNewIntegrant = [
  validationRulesIntegrantes,
  async (req, res) => {
    const {
      nombre_integrante,
      profesion,
      dependencia,
      email,
      experiencia_conocimiento
    } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const pool = await getConnection()
      const connection = await pool.promise()
      const [result] = await connection.query(
        queriesIntegrants.createNewIntegrant,
        [
          nombre_integrante,
          profesion,
          dependencia,
          email,
          experiencia_conocimiento
        ]
      )

      res.status(201).json({
        id: result.insertId,
        message: 'Integrant created succefully',
        datos: {
          nombre_integrante,
          profesion,
          dependencia,
          email,
          experiencia_conocimiento
        }
      })
    } catch (error) {
      res.status(500).json({ error: 'Error creating integrant' })
    }
  }
]

// Traer integrante por ID

export const getIntegrantById = async (req, res) => {
  try {
    const { id } = req.params
    const pool = await getConnection()
    const connection = await pool.promise()
    const [result] = await connection.query(
      queriesIntegrants.getIntegrantById,
      [id]
    )

    if (result.length > 0) {
      res.send(result[0])
    } else {
      res.status(400).json({ error: 'Integrant not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error getting integrant' })
  }
}

// TODO: Método updateIntegrant
// Actualizar, modificar o editar la información de un integrante.
export const updateIntegrant = [
  validationRulesIntegrantes,

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { id } = req.params
      const {
        nombre_integrante,
        profesion,
        dependencia,
        email,
        experiencia_conocimiento
      } = req.body

      const pool = await getConnection()
      const connection = await pool.promise()
      const [result] = await connection.query(
        queriesIntegrants.updateIntegrant,
        [
          nombre_integrante,
          profesion,
          dependencia,
          email,
          experiencia_conocimiento,
          id
        ]
      )

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Integrant not found' })
      }

      res.json({ message: 'Integrant update successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Error upadating integrant' })
      console.log(error)
    }
  }
]

// TODO: Método deleteIntegrant
// Elimar el registro de un integrante.
export const deleteIntegrant = async (req, res) => {
  try {
    const { id } = req.params

    const pool = await getConnection()
    const connection = await pool.promise()
    const [result] = await connection.query(queriesIntegrants.deleteIntegrant, [
      id
    ])

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Integrant not found' })
    }

    res.json({ message: 'Integrant deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting integrant' })
  }
}

// EndPoint que returna una búsqueda.
export const getAllBySearch = async (req, res) => {
  try {
    const { searchTerm } = req.params
    const searchTermLike = '%' + searchTerm + '%'

    const pool = await getConnection()
    const connection = await pool.promise()
    const [results] = await connection.query(queriesIntegrants.getAllBySearch, [
      searchTermLike,
      searchTermLike,
      searchTermLike
    ])

    // Transforma los datos obtenidos a la estructura deseada
    const transformedResult = {
      Search: results.map((integrant) => ({
        id: integrant.id,
        nombre_integrante: integrant.nombre_integrante,
        profesion: integrant.profesion,
        dependencia: integrant.dependencia,
        email: integrant.email,
        experiencia_conocimiento: integrant.experiencia_conocimiento
      }))
    }

    res.json(transformedResult)
  } catch (error) {
    res.status(500).json({ error: 'Error getting members by search term' })
  }
}
