export const queriesIntegrants = {
  getAllIntegrants: 'SELECT * FROM integrantes',
  getIntegrantById: 'SELECT * FROM integrantes WHERE id = ?',
  createNewIntegrant: 'INSERT INTO integrantes (nombre_integrante, profesion, dependencia, email, experiencia_conocimiento) VALUES (?, ?, ?, ?, ?)',
  updateIntegrant: 'UPDATE integrantes SET nombre_integrante = ?, profesion = ?, dependencia = ?, email = ?, experiencia_conocimiento = ? WHERE id = ?',
  deleteIntegrant: 'DELETE FROM integrantes WHERE id = ?',
  getAllBySearch: 'SELECT * FROM integrantes WHERE nombre_integrante LIKE ? OR profesion LIKE ? OR experiencia_conocimiento LIKE ?'
}
