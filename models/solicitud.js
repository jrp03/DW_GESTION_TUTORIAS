export class Solicitud {
  // Datos de ejemplo para simular una base de datos
  static #solicitudes = [
    { id: 1, estado: "pendiente", alumno: "Juan Pérez", materia: "Matemáticas" },
    { id: 2, estado: "aprobado", alumno: "María García", materia: "Física" }
  ];

  static getAll() {
    return { success: true, data: this.#solicitudes };
  }

  static getById(id) {
    const solicitud = this.#solicitudes.find(s => s.id === parseInt(id));
    return { success: !!solicitud, data: solicitud ? [solicitud] : [] };
  }

  static getByEstado(estado) {
    const solicitudes = this.#solicitudes.filter(s => s.estado === estado);
    return { success: true, data: solicitudes };
  }

  // Añade los demás métodos necesarios con la misma estructura
  static getByAlumno(nombreAlumno) {
    const solicitudes = this.#solicitudes.filter(s => s.alumno.includes(nombreAlumno));
    return { success: true, data: solicitudes };
  }

  static create(solicitud) {
    const nuevaSolicitud = { ...solicitud, id: this.#solicitudes.length + 1 };
    this.#solicitudes.push(nuevaSolicitud);
    return { success: true, data: nuevaSolicitud };
  }

  // ... otros métodos con implementación similar
}