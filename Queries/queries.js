const clientes = [
  { nombre: "Ana", edad: 28, pais: "México", compras: [120, 340, 560] },
  { nombre: "Carlos", edad: 32, pais: "Guatemala", compras: [600, 200, 50] },
  { nombre: "María", edad: 45, pais: "El Salvador", compras: [700, 800] },
  { nombre: "Luis", edad: 22, pais: "México", compras: [80, 20] },
  { nombre: "Sofía", edad: 38, pais: "Honduras", compras: [500, 520, 480] },
  { nombre: "Pedro", edad: 50, pais: "Guatemala", compras: [1000] },
  { nombre: "Lucía", edad: 27, pais: "México", compras: [300, 250, 100] },
  { nombre: "Jorge", edad: 41, pais: "El Salvador", compras: [450, 550] },
  { nombre: "Valeria", edad: 30, pais: "Guatemala", compras: [30, 40, 50] },
  { nombre: "Andrés", edad: 35, pais: "México", compras: [900, 200] },
  { nombre: "Marcela", edad: 29, pais: "Honduras", compras: [120, 110, 130] },
  { nombre: "Diego", edad: 55, pais: "México", compras: [700, 700, 700] },
  { nombre: "Paola", edad: 26, pais: "El Salvador", compras: [10, 20] },
  { nombre: "Fernando", edad: 48, pais: "Guatemala", compras: [560, 600] },
  { nombre: "Raquel", edad: 33, pais: "México", compras: [400, 610] },
  { nombre: "Miguel", edad: 39, pais: "Honduras", compras: [520, 490, 510] },
  { nombre: "Nadia", edad: 24, pais: "El Salvador", compras: [5, 15] },
  { nombre: "Óscar", edad: 44, pais: "Guatemala", compras: [800, 120] },
  { nombre: "Beatriz", edad: 31, pais: "México", compras: [480, 520] },
  { nombre: "Roberto", edad: 36, pais: "Honduras", compras: [200, 300, 400] }
];

db.clientes.drop();
db.clientes.insertMany(clientes);

print("Insertados clientes: " + db.clientes.countDocuments());

// a) Escribe una query para obtener todos los clientes de México con edad mayor a 25.

db.clientes.find(
  { pais: "México", edad: { $gt: 25 } }
).pretty()

// b) Escribe una query que proyecte el nombre y el promedio de compras.
db.clientes.aggregate([
  {
    $project: {
      nombre: 1,
      promedioCompras: { $avg: "$compras" }
    }
  }
])
