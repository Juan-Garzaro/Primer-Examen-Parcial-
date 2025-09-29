# Primer Examen Parcial Bases de Datos 2 - Parte Teórica


## a. ¿Qué es una colección basada en consultas y cómo se diferencia de una colección estática?

- **Colección basada en consultas**:  
  Es un conjunto de documentos o registros que no se almacenan de forma fija, sino que se **definen mediante una consulta**.  
  Cada vez que el sistema accede a la colección, ejecuta la consulta para traer los datos actualizados.  
  *Ejemplo*: en MongoDB, una colección virtual que siempre muestre los pedidos de los últimos 30 días.

- **Colección estática**:  
  Es un conjunto de documentos **almacenados permanentemente** en la base de datos.  
  Su contenido solo cambia cuando un usuario lo modifica mediante operaciones de inserción, actualización o eliminación.  

**Diferencia clave**:  
La colección estática es **persistente y fija**, mientras que la colección basada en consultas es **dinámica y depende de los resultados de una consulta ejecutada al momento**.

---

## b. Diferencias entre consulta ad-hoc, vista materializada y colección dinámica

| Tipo                | Almacenamiento                | Actualización                            | Rendimiento | Uso típico                  |
|---------------------|-------------------------------|------------------------------------------|-------------|-----------------------------|
| Consulta Ad-hoc     | No almacena datos             | Siempre actual                           | Más lento   | Consultas puntuales         |
| Vista Materializada | Almacena resultados           | Actualiza periódicamente                 | Más rápido  | Consultas frecuentes        |
| Colección Dinámica  | Datos actualizados al momento | Actualización en tiempo real o casi real | Intermedio  | Datos recientes y flexibles |

---

## c. Ventajas y desventajas de las colecciones basadas en consultas

### Ventajas
-  Datos siempre actualizados sin necesidad de refrescar manualmente  
-  Menor redundancia, ya que no se duplican registros  
-  Flexibilidad para definir colecciones virtuales según criterios específicos  

### Desventajas
-  Mayor costo en rendimiento, ya que la consulta se ejecuta cada vez que se accede  
-  Dependencia de índices: sin ellos las consultas pueden ser lentas  
-  Complejidad en seguridad y permisos, al manejar datos derivados  



