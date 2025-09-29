// 1️ Insertar documentos en la colección "pedidos"
db.pedidos.insertMany([
  { cliente: "Ana", estado: "pendiente", total: 340 },   
  { cliente: "Luis", estado: "enviado", total: 50 },    
  { cliente: "Carlos", estado: "entregado", total: 283 },
  { cliente: "María", estado: "pendiente", total: 750 }  
]);

// 2️ Crear una vista dinámica llamada "pedidosActivos"
//    Esta vista mostrará solo los pedidos cuyo estado sea "pendiente" o "enviado"
db.createView(
  "pedidosActivos",   // Nombre de la vista que vamos a crear
  "pedidos",          // Colección base sobre la que se construye la vista
  [
    { $match: { estado: { $in: ["pendiente", "enviado"] } } } // Filtro por estados activos
  ]
);

// 3️ Consultar todos los documentos de la vista "pedidosActivos"
//    La función .pretty() solo formatea la salida para que sea más legible
db.pedidosActivos.find().pretty();
