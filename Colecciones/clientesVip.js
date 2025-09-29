db.createView(
  "clientesVIP",
  "clientes",
  [
    { $project: { nombre: 1, compras: 1, promedio: { $avg: "$compras" } } },
    { $match: { promedio: { $gt: 500 } } }
  ]
)

// Verificar que se creó correctamente
db.clientesVIP.find().pretty()
