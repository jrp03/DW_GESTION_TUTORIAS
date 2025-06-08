// Controlador para el módulo de solicitudes
const principalController = {
  /**
   * Obtener todas las solicitudes
   */
  getAll: async (req, res) => {
    try {
      const result = await principal.getAll()
      res.json(result)
    } catch (error) {
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: error.message,
        DATA: [],
      })
    }
  }
}

module.exports = principalController;