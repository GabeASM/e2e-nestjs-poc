# Pruebas E2E NestJS
El presente proyecto es el backend de la aplicación, la cual consisten en un sistema que encripta texto usando el algoritmo BlowFish. 

La idea de la aplicación es poder enviar mensajes encriptados a varias personas de manera sencilla desde el teléfono. 

## SetUp

```bash
# iniciar la aplicacion (necesario para las pruebas del frontend)
$ sudo docker-compose -f docker-compose.yml up --build

# Ejecutar set de pruebas E2E.
$ sudo docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit --exit-code-from test-e2e

# Terminar la ejecucion de los contenedores (Hacer cada vez que se quiera detener la aplicacion por completo o una vez terminado de ejecutar el set de pruebas).
sudo docker-compose down --remove-orphans

# Importante: evitar utilizar CTRL + C para terminar el proceso de ejecucion de los contenedores
```



# Pruebas End-to-End (E2E)

## ¿Qué son las pruebas E2E?

Las pruebas **End-to-End (E2E)** son un tipo de pruebas que validan todo el flujo de una aplicación, desde el inicio hasta el final, verificando que todos los componentes del sistema funcionen correctamente en conjunto. Estas pruebas simulan escenarios de uso real para asegurarse de que todos los elementos de la aplicación interactúan como se espera, incluyendo la interfaz de usuario (UI), el backend, bases de datos y otros servicios externos.

El objetivo principal de las pruebas E2E es garantizar que las funcionalidades críticas de la aplicación funcionen correctamente cuando se ejecutan en un entorno completo y realista.

## Diferencias con otros tipos de pruebas

1. **Pruebas unitarias**: Las pruebas unitarias están diseñadas para verificar partes pequeñas y aisladas del código, como funciones o clases individuales. Estas pruebas no cubren la integración entre diferentes componentes.

2. **Pruebas de integración**: Las pruebas de integración validan la interacción entre varios componentes o módulos del sistema, pero no cubren el flujo completo de la aplicación desde el inicio hasta el final.

3. **Pruebas funcionales**: Este tipo de pruebas se centra en verificar que una función específica de la aplicación funcione según lo previsto. Sin embargo, no cubren la interacción de la aplicación en su totalidad, como lo hacen las pruebas E2E.

### Comparación:

| Tipo de Prueba    | Alcance                  | Objetivo                                         |
|-------------------|--------------------------|--------------------------------------------------|
| **Unitarias**     | Partes individuales       | Verificar que funciones o clases aisladas funcionan correctamente |
| **Integración**   | Módulos o componentes     | Validar que los componentes del sistema interactúen correctamente |
| **E2E**           | Todo el sistema           | Simular un flujo completo de usuario y garantizar que todo funcione correctamente desde el inicio hasta el final |

## ¿Por qué son importantes las pruebas E2E?

Las pruebas E2E son fundamentales porque aseguran que la aplicación funcione como un todo, simulando cómo un usuario real interactuaría con ella. Estas pruebas son clave para identificar problemas que pueden surgir en la interacción entre componentes, que no se detectan con pruebas unitarias o de integración.

### Beneficios de las pruebas E2E:

- **Simulan casos reales**: Las pruebas E2E ejecutan escenarios de uso real para validar la aplicación en situaciones que los usuarios podrían experimentar.
- **Detectan errores de integración complejos**: Verifican la interacción entre los diferentes servicios o componentes de la aplicación.
- **Aseguran la calidad del producto**: Garantizan que la aplicación sea funcional en un entorno de producción completo y que no se rompan flujos críticos.
  
## ¿Por qué realizar pruebas E2E en el backend?

Realizar pruebas E2E en el backend es crucial porque asegura que todas las funcionalidades ofrecidas por la API o servicios backend funcionen correctamente cuando interactúan con otros sistemas y con la UI. Además, garantiza que los datos fluyan correctamente entre el frontend y el backend, y que las respuestas del servidor sean las esperadas.

### Razones para realizar pruebas E2E en el backend:

1. **Validación de la API**: Confirma que las API respondan correctamente a las solicitudes del frontend, incluyendo la validación de los endpoints, la correcta manipulación de datos y la integridad de las respuestas.
   
2. **Interacción con servicios externos**: En muchos casos, el backend interactúa con otros servicios o bases de datos. Las pruebas E2E aseguran que estas interacciones se realicen sin problemas.
   
3. **Prevención de regresiones**: Al tener pruebas E2E, es más fácil detectar errores de regresión que puedan surgir por cambios en el backend.

4. **Seguridad y manejo de autenticación**: En muchas aplicaciones, el backend se encarga de la autenticación y autorización de usuarios. Las pruebas E2E aseguran que estas funcionalidades críticas se ejecuten correctamente.
