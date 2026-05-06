# API del Balón de Oro

API REST profesional que permite explorar la historia completa del prestigioso Balón de Oro, gestionar jugadores nominados y consultar ceremonias históricas desde 1956 hasta la actualidad.

Esta API implementa una arquitectura hexagonal completa con separación clara entre la lógica de dominio y los detalles de infraestructura. Utiliza Node.js con Express como framework web, PostgreSQL como base de datos mediante la librería nativa pg, Cloudinary para gestión de imágenes, y está diseñada específicamente para entornos serverless.

## Configuración de Base de Datos

Este proyecto utiliza **Supabase** (PostgreSQL) con **Transaction Pooler** para garantizar compatibilidad total con entornos serverless.

### Por qué Transaction Pooler

Vercel opera bajo una arquitectura serverless completamente stateless. En este paradigma, cada función serverless establece conexiones nuevas a PostgreSQL, lo que sin un sistema de pooling adecuado provocaría el agotamiento rápido del límite de conexiones simultáneas de la base de datos.

PostgreSQL tiene un límite de conexiones concurrentes (típicamente 100-500 dependiendo del plan). En arquitecturas tradicionales con un servidor persistente, las conexiones se reutilizan mediante pools locales. Sin embargo, en serverless:
- Cada invocación puede crear una nueva instancia de función
- Las instancias no mantienen estado entre ejecuciones
- Múltiples instancias pueden ejecutarse simultáneamente bajo carga
- Las conexiones directas se agotarían rápidamente en entornos de producción

Transaction Pooler (modo PgBouncer) resuelve este problema actuando como intermediario entre las funciones serverless y PostgreSQL:
- Mantiene un pool de conexiones persistentes a PostgreSQL
- Asigna conexiones del pool a las funciones según demanda
- Libera conexiones inmediatamente después de cada transacción
- Permite que miles de funciones compartan un conjunto pequeño de conexiones físicas

El puerto 6543 usa el modo Transaction, donde cada transacción SQL puede usar una conexión diferente del pool. Esto es ideal para serverless porque las funciones ejecutan queries cortos y no mantienen sesiones largas. El modo Session (puerto 5432) no es compatible con serverless porque mantiene la misma conexión durante toda la sesión del cliente.

### Pasos de Configuración

1. Crea un proyecto gratuito en [supabase.com](https://supabase.com)
2. Navega a **Settings → Database → Connection string**
3. Selecciona el modo **"Transaction pooler"** (puerto 6543)
4. Copia la URI de conexión
5. Reemplaza `[YOUR-PASSWORD]` con la contraseña de tu proyecto
6. Pégala como `DATABASE_URL` en tu archivo `.env`
7. Ejecuta las migraciones y seed inicial:
   ```bash
   npm run migrate
   npm run seed
   ```

## Configuración CORS

CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad implementado por los navegadores web que controla qué dominios pueden realizar peticiones HTTP a recursos alojados en un dominio diferente.

Cuando una página web en el dominio A (por ejemplo, http://localhost:5500) intenta realizar una petición fetch() o XMLHttpRequest a una API en el dominio B (por ejemplo, http://localhost:3001), el navegador primero envía una petición OPTIONS preflight para verificar si el servidor permite peticiones cross-origin desde ese origen específico.

En esta API, el middleware CORS está configurado mediante la librería cors de Express para:
- Permitir peticiones desde el origen especificado en `ALLOWED_ORIGIN` (variable de entorno)
- Configurado por defecto en `*` (todos los orígenes) durante desarrollo local
- Debe restringirse a dominios específicos en producción (ej: https://tudominio.com)
- Permite métodos HTTP: GET, POST, PUT, DELETE
- Permite headers personalizados necesarios para autenticación y content-type
- Habilita credentials (cookies) si se requiere autenticación con sesiones

Configurar CORS correctamente es crítico para evitar errores de CORS bloqueados por el navegador que impiden que el frontend se comunique con el backend.

## Estructura del Proyecto

La arquitectura hexagonal (también conocida como Ports and Adapters) organiza el código en capas concéntricas donde la lógica de negocio (dominio) está en el centro, completamente aislada de detalles de infraestructura como frameworks, bases de datos o APIs externas.

```
src/
├── api/
│   ├── routes/           # Definición de endpoints HTTP
│   ├── middlewares/      # Validación, manejo de errores, CORS
│   └── docs/             # Especificación OpenAPI/Swagger
├── application/
│   ├── services/         # Casos de uso y lógica de negocio
│   └── ports/            # Interfaces (contratos) para repositorios
├── domain/
│   └── entities/         # Modelos de dominio (jugadores, ceremonias)
└── infrastructure/
    ├── repositories/     # Implementaciones concretas de acceso a datos
    ├── database/         # Configuración de PostgreSQL y migraciones
    └── cloudinary/       # Integración con servicio de imágenes
```

Ventajas de esta arquitectura:
- La lógica de negocio no depende de frameworks ni librerías externas
- Facilita testing al poder mockear adapters
- Permite cambiar infraestructura sin tocar el dominio
- El dominio define interfaces, la infraestructura las implementa

## Cómo Ejecutar Localmente

1.  **Clona el repositorio**
2.  **Instala las dependencias**:
    ```bash
    npm install
    ```
3.  **Configura las variables de entorno**:
    Crea un archivo `.env` basándote en `.env.example` y proporciona tus credenciales de Supabase y Cloudinary.
4.  **Configura la base de datos**:
    Sigue la sección [Configuración de Base de Datos](#configuración-de-base-de-datos) arriba.
5.  **Inicia el servidor de desarrollo**:
    ```bash
    npm run dev
    ```
6.  **Explora la API**:
    Visita `http://localhost:3001/api/docs` para ver la documentación interactiva de Swagger.

## Tecnologías y Librerías Utilizadas

**Core Framework:**
- Node.js v18+ como runtime de JavaScript
- Express v4.18+ como framework web para routing y middlewares
- dotenv para gestión de variables de entorno

**Base de Datos:**
- PostgreSQL 15+ como sistema de gestión de base de datos relacional
- pg v8.11+ (node-postgres) para conexión nativa a PostgreSQL sin ORM
- Transaction Pooler (PgBouncer) para gestión eficiente de conexiones en serverless

**Validación y Seguridad:**
- express-validator v7+ para validación y sanitización de inputs
- cors para configuración de Cross-Origin Resource Sharing

**Upload y Gestión de Archivos:**
- multer v1.4+ para procesamiento de multipart/form-data
- Configurado con memoryStorage para mantener archivos en buffer (compatible con serverless)

**Gestión de Imágenes:**
- Cloudinary v2 SDK para upload, transformación y optimización de imágenes
- Soporte para múltiples formatos, redimensionamiento automático y generación de URLs firmadas

**Documentación:**
- swagger-ui-express v5+ para interfaz interactiva de documentación
- Especificación OpenAPI 3.0.0 para definición formal de endpoints

**Desarrollo:**
- nodemon para hot-reloading durante desarrollo
- ESLint para linting y mantenimiento de estándares de código

## Desafíos Implementados

**Arquitectura Hexagonal (Puertos y Adaptadores)**
Implementación completa de arquitectura hexagonal con separación rigurosa entre:
- Capa de dominio: Entidades y lógica de negocio pura
- Capa de aplicación: Casos de uso y definición de puertos (interfaces)
- Capa de infraestructura: Adaptadores concretos (PostgreSQL, Cloudinary)
- Capa de API: Controllers, routes y middlewares HTTP

**JavaScript Puro sin TypeScript**
Todo el proyecto está escrito en JavaScript ES6+ sin utilizar TypeScript. Esto demuestra:
- Dominio profundo de JavaScript moderno (async/await, destructuring, modules)
- Capacidad para mantener código limpio y organizado sin type safety
- Uso de JSDoc para documentación de tipos donde es crítico

**SQL Nativo con pg**
Sin usar ningún ORM (como Sequelize o TypeORM), todas las queries están escritas en SQL nativo:
- Control total sobre queries y optimización de performance
- Uso de prepared statements para prevenir SQL injection
- Queries complejas con JOINs, agregaciones y CTEs
- Manejo manual de transacciones y rollbacks

**Gestión de Imágenes con Cloudinary**
Integración completa del SDK v2 de Cloudinary:
- Upload de imágenes desde buffer en memoria (compatible con serverless)
- Transformación automática (resize, crop, format conversion)
- Generación de URLs optimizadas con CDN
- Gestión de límites de almacenamiento y cleanup de recursos

**Upload de Archivos con Multer**
Configuración de multer con memoryStorage en lugar de diskStorage:
- Los archivos nunca se escriben al disco (incompatible con serverless)
- Se mantienen en buffer RAM y se envían directamente a Cloudinary
- Validación de tipos MIME y tamaños máximos
- Manejo de errores específicos de upload

**Validación Server-Side Robusta**
Implementación de validación completa con express-validator:
- Validación de tipos, formatos y rangos
- Sanitización de inputs para prevenir XSS
- Mensajes de error personalizados y descriptivos
- Validación de archivos y multipart data

**Documentación con Swagger UI**
Documentación interactiva completa siguiendo OpenAPI 3.0:
- Definición de todos los endpoints con request/response schemas
- Ejemplos de peticiones y respuestas
- Descripción de códigos de error
- Interfaz Try-it-out para probar endpoints directamente

**Deployment Serverless en Vercel**
Configuración específica para entornos serverless:
- Función serverless por endpoint (no servidor persistente)
- Connection pooling mediante Transaction Pooler
- Variables de entorno gestionadas en Vercel dashboard
- Deploy automático desde Git con preview deployments

## Reflexión sobre el Stack Tecnológico

El stack elegido (Node.js, Express, pg, Cloudinary) demuestra ser robusto y altamente performante en entornos serverless. Utilizar SQL nativo proporciona control total sobre las consultas y elimina el overhead de un ORM, lo cual resulta excelente para aprender los fundamentos y optimizar finamente cada query.

Sin embargo, en proyectos más grandes, la ausencia de type safety de TypeScript y el mapeo manual de resultados SQL a entidades de dominio puede volverse tedioso y propenso a errores. Definitivamente volvería a usar este stack para APIs ligeras de alto rendimiento o cuando se requiera control estricto sobre la capa de base de datos, pero consideraría TypeScript + un query builder como Kysely para proyectos enterprise.

## API en Producción

Producción: https://proy1-balon-de-oro-api.vercel.app/

La API está desplegada en Vercel con las siguientes características:
- Auto-scaling automático basado en demanda
- Edge network global con baja latencia
- HTTPS automático con certificados SSL
- Rollback instantáneo a versiones anteriores
- Logs y analytics en tiempo real

## Capturas de Pantalla

### Swagger UI (Documentación Interactiva de la API)
![Documentación Swagger](./assets/swagger.png)

### Endpoints de la API
![Rutas](./assets/routes.png)

### Jugadores - Obtener Todos
![Obtener Todos los Jugadores](./assets/getall.png)

### Health Check
![Health Check](./assets/health.png)

## Endpoints Disponibles

**Jugadores**
- GET /api/players - Obtener todos los jugadores con paginación opcional
- GET /api/players/:id - Obtener un jugador específico por ID
- POST /api/players - Crear un nuevo jugador (requiere multipart/form-data para foto)
- PUT /api/players/:id - Actualizar un jugador existente
- DELETE /api/players/:id - Eliminar un jugador (también elimina su foto de Cloudinary)

**Ceremonias**
- GET /api/ceremonies - Obtener todas las ceremonias
- GET /api/ceremonies/:year - Obtener ceremonia de un año específico
- GET /api/ceremonies/:year/nominations - Obtener las nominaciones de un año

**Utilidades**
- GET /api/health - Health check del servidor y conexión a base de datos

Todos los endpoints incluyen validación de inputs, manejo de errores consistente y respuestas en formato JSON estándar.

## Fuentes de Datos

Datos históricos del Balón de Oro (ganadores y nominados 1956-2025) obtenidos y curados desde:
- [DAZN - Lista de ganadores y palmarés del Balón de Oro](https://www.dazn.com/es-ES/news/f%C3%BAtbol/balon-de-oro-lista-de-ganadores-y-palmares-del-premio-al-mejor-futbolista-del-mundo-de-france-football/yk3dalhzw9tu133fh8hrsrolu)

Los datos incluyen:
- Ganadores del Balón de Oro desde 1956 hasta 2025
- Nominados y posiciones finales cuando están disponibles
- Información de clubes y nacionalidades
- Años sin ceremonia (2020 por COVID-19)

## Repositorio del Frontend

Enlace al repositorio del cliente: [proy1-balon-de-oro-client](https://github.com/asanabria-2021067/proy1-balon-de-oro-client)

## Swagger en Backend Hosteado

Acceder a documentación interactiva Swagger en producción: [https://proy1-balon-de-oro-api.vercel.app/api/docs/](https://proy1-balon-de-oro-api.vercel.app/api/docs/)