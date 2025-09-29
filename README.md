# Proyecto Final – Bases de Datos 2: Primer Examen Parcial 

## Instrucciones de ejecución completas

```powershell
# 1️ Navegar a la carpeta del proyecto donde está docker-compose.yml
cd C:\Users\Juan Garzaro\docker

# 2️ Levantar contenedores en segundo plano
docker-compose up -d

# 3️ Verificar que los contenedores estén corriendo
docker ps
# Deben aparecer dos contenedores:
# - mongodb_exam → MongoDB puerto 27017
# - mongo_express_exam → Mongo Express puerto 8081

# 4️ Conectarse al contenedor de MongoDB con mongosh
docker exec -it mongodb_exam mongosh -u root -p example --authenticationDatabase admin

# 5️ Seleccionar la base de datos del examen
use examen_db

# 6️ Insertar clientes de ejemplo (nombre, edad, país y compras)
db.clientes.drop(); // Limpiar colección si existe
db.clientes.insertMany([
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
]);

// Consultar clientes de México mayores de 25 años
db.clientes.find({ pais: "México", edad: { $gt: 25 } }).pretty();

// Proyectar nombre y promedio de compras
db.clientes.aggregate([
  { $project: { nombre: 1, promedioCompras: { $avg: "$compras" } } }
]);

# 7️ Crear vista dinámica clientesVIP (promedio de compras > 500)
db.createView(
  "clientesVIP",
  "clientes",
  [
    { $project: { nombre: 1, compras: 1, promedio: { $avg: "$compras" } } },
    { $match: { promedio: { $gt: 500 } } }
  ]
);

// Consultar clientesVIP
db.clientesVIP.find().pretty();

# 8️ Insertar pedidos de ejemplo
db.pedidos.drop(); // Limpiar colección si existe
db.pedidos.insertMany([
  { cliente: "Ana", estado: "pendiente", total: 340 },
  { cliente: "Luis", estado: "enviado", total: 50 },
  { cliente: "Carlos", estado: "entregado", total: 283 },
  { cliente: "María", estado: "pendiente", total: 750 }
]);

# 9️ Crear vista dinámica pedidosActivos (pendientes o enviados)
db.createView(
  "pedidosActivos",
  "pedidos",
  [
    { $match: { estado: { $in: ["pendiente", "enviado"] } } }
  ]
);

// Consultar pedidos activos
db.pedidosActivos.find().pretty();

# 10️ Insertar pedidos con fecha simulando últimos 30 días
db.pedidos.insertMany([
  { cliente: "Ana", estado: "pendiente", total: 340, fecha: new Date() },
  { cliente: "Luis", estado: "enviado", total: 50, fecha: new Date() },
  { cliente: "Carlos", estado: "entregado", total: 283, fecha: new Date(new Date() - 1000*60*60*24*5) },
  { cliente: "María", estado: "pendiente", total: 750, fecha: new Date(new Date() - 1000*60*60*24*10) },
  { cliente: "Pedro", estado: "pendiente", total: 1000, fecha: new Date(new Date() - 1000*60*60*24*25) },
  { cliente: "Raquel", estado: "enviado", total: 505, fecha: new Date(new Date() - 1000*60*60*24*31) }
]);

# 11 Crear vista dinámica pedidosLast30Days
db.createView(
  "pedidosLast30Days",
  "pedidos",
  [
    { $match: { fecha: { $gte: new Date(new Date() - 1000*60*60*24*30) } } }
  ]
);

// Consultar pedidos de los últimos 30 días
db.pedidosLast30Days.find().pretty();

# 12 Crear índices para optimizar búsquedas
db.pedidos.createIndex({ estado: 1 }); // índice por estado
db.pedidos.createIndex({ fecha: -1 }); // índice por fecha descendente

#13 Acceso web a Mongo Express
# URL: http://localhost:8081
# Usuario: admin
# Contraseña: admin
