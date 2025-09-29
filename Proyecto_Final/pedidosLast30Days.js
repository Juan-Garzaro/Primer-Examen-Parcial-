// Insertar pedidos de ejemplo en la colección "pedidos"
// Usamos new Date() y restamos milisegundos para simular fechas pasadas
db.pedidos.insertMany([
  { cliente: "Ana", estado: "pendiente", total: 340, fecha: new Date() }, // hoy
  { cliente: "Luis", estado: "enviado", total: 50, fecha: new Date() }, // hoy
  { cliente: "Carlos", estado: "entregado", total: 283, fecha: new Date(new Date() - 1000*60*60*24*5) }, // hace 5 días
  { cliente: "María", estado: "pendiente", total: 750, fecha: new Date(new Date() - 1000*60*60*24*10) }, // hace 10 días
  { cliente: "Pedro", estado: "pendiente", total: 1000, fecha: new Date(new Date() - 1000*60*60*24*25) }, // hace 25 días
  { cliente: "Raquel", estado: "enviado", total: 505, fecha: new Date(new Date() - 1000*60*60*24*31) } // hace 31 días, fuera del rango
]);

// Creamos la vista "pedidosLast30Days" que siempre muestra solo los pedidos de los últimos 30 días
db.createView(
  "pedidosLast30Days", // Nombre de la vista
  "pedidos",           // Colección base
  [
    { 
      $match: { 
        fecha: { $gte: new Date(new Date() - 1000*60*60*24*30) } // filtro últimos 30 días
      } 
    }
  ]
);

// Consultar pedidos de los últimos 30 días
db.pedidosLast30Days.find().pretty();

// Índice para buscar pedidos por estado
db.pedidos.createIndex({ estado: 1 });

// Índice para búsquedas por fecha descendente
db.pedidos.createIndex({ fecha: -1 });
