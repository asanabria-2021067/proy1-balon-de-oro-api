# 🏆 API del Balón de Oro

API REST profesional que permite explorar la historia completa del prestigioso Balón de Oro, gestionar jugadores nominados y consultar ceremonias históricas desde 1956 hasta la actualidad.

## 🗄️ Configuración de Base de Datos

Este proyecto utiliza **Supabase** (PostgreSQL) con **Transaction Pooler** para garantizar compatibilidad total con entornos serverless.

### ¿Por qué Transaction Pooler?

Vercel opera bajo una arquitectura serverless completamente stateless. En este paradigma, cada función serverless establece conexiones nuevas a PostgreSQL, lo que sin un sistema de pooling adecuado provocaría el agotamiento rápido del límite de conexiones simultáneas de la base de datos. Transaction Pooler resuelve este problema gestionando un pool de conexiones reutilizables, permitiendo que múltiples funciones serverless compartan conexiones de manera eficiente.

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

## 🔐 Configuración CORS

CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad del navegador que restringe cómo los recursos de una página web pueden ser solicitados desde otro dominio diferente al que sirvió el recurso original. En esta API, CORS está configurado para permitir peticiones desde el origen especificado en la variable de entorno `ALLOWED_ORIGIN` (por defecto configurado en `*` para desarrollo, pero debe restringirse en producción).

## 🚀 Cómo Ejecutar Localmente

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

## ✨ Desafíos Implementados
- [x] **Arquitectura Hexagonal** (Puertos y Adaptadores) - Separación clara entre lógica de negocio e infraestructura
- [x] **JavaScript Puro** - Sin TypeScript, demostrando dominio de JavaScript ES6+
- [x] **SQL Nativo** con librería `pg` - Sin ORM, control total sobre las consultas
- [x] **Gestión de Imágenes** con Cloudinary v2 SDK - Upload, transformación y optimización
- [x] **Upload de Archivos** con `multer` (memoryStorage) - Manejo eficiente en memoria
- [x] **Validación Server-Side** con `express-validator` - Sanitización y validación robusta
- [x] **Documentación API** con Swagger (OpenAPI 3.0) - Documentación interactiva profesional
- [x] **Deployment Serverless** en Vercel - Escalabilidad automática y alta disponibilidad

## 🛠️ Reflexión sobre el Stack Tecnológico

El stack elegido (Node.js, Express, pg, Cloudinary) demuestra ser robusto y altamente performante en entornos serverless. Utilizar SQL nativo proporciona control total sobre las consultas y elimina el overhead de un ORM, lo cual resulta excelente para aprender los fundamentos y optimizar finamente cada query.

Sin embargo, en proyectos más grandes, la ausencia de type safety de TypeScript y el mapeo manual de resultados SQL a entidades de dominio puede volverse tedioso y propenso a errores. Definitivamente volvería a usar este stack para APIs ligeras de alto rendimiento o cuando se requiera control estricto sobre la capa de base de datos, pero consideraría TypeScript + un query builder como Kysely para proyectos enterprise.

## 🌐 API en Producción
**Producción:** https://proy1-balon-de-oro-api.vercel.app/

## 📸 Capturas de Pantalla

### Swagger UI (Documentación Interactiva de la API)
![Documentación Swagger](./assets/swagger.png)

### Endpoints de la API
![Rutas](./assets/routes.png)

### Jugadores - Obtener Todos
![Obtener Todos los Jugadores](./assets/getall.png)

### Health Check
![Health Check](./assets/health.png)

## 📊 Fuentes de Datos

Datos históricos del Balón de Oro (ganadores y nominados 1956-2025) obtenidos de:
- [DAZN - Lista de ganadores y palmarés del Balón de Oro](https://www.dazn.com/es-ES/news/f%C3%BAtbol/balon-de-oro-lista-de-ganadores-y-palmares-del-premio-al-mejor-futbolista-del-mundo-de-france-football/yk3dalhzw9tu133fh8hrsrolu)

## 🎨 Repositorio del Frontend
[Enlace al repositorio del cliente](https://github.com/asanabria-2021067/proy1-balon-de-oro-client)

## 📖 Swagger en Backend Hosteado
[Acceder a Swagger en producción](https://proy1-balon-de-oro-api.vercel.app/api/docs/)