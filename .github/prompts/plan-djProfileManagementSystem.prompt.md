# Plan: Sistema de Administración de Perfiles de DJs

**TL;DR** - Crear un sistema full-stack para gestionar perfiles de DJs con CRUD, autenticación de usuarios (DJs pueden registrarse y editar sus perfiles), backend en Node.js/Express con MongoDB, y frontend en React. Incluye campos como nombre, país, biografía, género musical (lista predefinida), links a Instagram y Soundcloud, y foto de perfil almacenada localmente.

**Steps**
1. **Fase 1: Configuración del Proyecto**  
   - Inicializar backend: Crear carpeta `server/`, ejecutar `npm init`, instalar dependencias (express, mongoose, bcryptjs, jsonwebtoken, multer para uploads, cors, dotenv).  
   - Inicializar frontend: Crear carpeta `client/`, usar `create-react-app` o `vite` para React, instalar axios para API calls.  
   - Configurar estructura de carpetas: `server/` para backend, `client/` para frontend.  
   - Configurar variables de entorno (.env) para MongoDB URI, JWT secret, puerto.

2. **Fase 2: Backend - Modelo de Datos y Autenticación**  
   - Crear modelo de Usuario (User): campos email, password (hashed), role (DJ).  
   - Crear modelo de DJ Profile: campos name, country, bio, genre (enum: EDM, Techno, House, Industrial, etc.), instagram (string), soundcloud (string), profileImage (string path), userId (ref a User).  
   - Implementar rutas de autenticación: /auth/register (crear usuario y perfil inicial), /auth/login (JWT).  
   - Middleware de autenticación para proteger rutas.

3. **Fase 3: Backend - CRUD de Perfiles**  
   - Rutas para DJ profiles: GET /profiles (listar todos), GET /profiles/:id (ver uno), POST /profiles (crear, solo para usuario autenticado), PUT /profiles/:id (actualizar propio perfil), DELETE /profiles/:id (eliminar propio perfil).  
   - Integrar multer para upload de fotos de perfil (guardar en carpeta `uploads/` localmente).  
   - Validación de datos con express-validator.

4. **Fase 4: Frontend - Componentes y Autenticación**  
   - Crear componentes: Login/Register forms, Dashboard (lista de perfiles), ProfileForm (crear/editar perfil), ProfileView (detalles).  
   - Implementar autenticación: Guardar JWT en localStorage, enviar en headers para requests.  
   - Usar React Router para navegación (rutas protegidas).

5. **Fase 5: Integración y Testing**  
   - Conectar frontend con backend via axios.  
   - Implementar manejo de errores y loading states.  
   - Probar CRUD completo, autenticación, upload de fotos.

**Relevant files**
- `server/models/User.js` — Modelo de usuario  
- `server/models/DJProfile.js` — Modelo de perfil DJ  
- `server/routes/auth.js` — Rutas de autenticación  
- `server/routes/profiles.js` — Rutas CRUD de perfiles  
- `client/src/components/Login.js` — Componente de login  
- `client/src/components/ProfileForm.js` — Formulario de perfil  
- `client/src/App.js` — Enrutamiento principal  

**Verification**
1. Ejecutar backend: `npm start` en server/, verificar conexión a MongoDB y rutas con Postman.  
2. Ejecutar frontend: `npm start` en client/, probar registro/login y CRUD de perfiles.  
3. Verificar upload de fotos: Subir imagen, verificar en carpeta uploads/ y en perfil.  
4. Pruebas manuales: Crear, editar, ver, eliminar perfil como DJ autenticado.

**Decisions** 
- Base de datos: MongoDB con Mongoose por simplicidad y flexibilidad.  
- Autenticación: JWT para stateless auth; DJs registran y editan sus propios perfiles.  
- Almacenamiento de fotos: Local en servidor (carpeta uploads/) para simplicidad.  
- Redes sociales: Campos específicos para Instagram y Soundcloud.  
- Género musical: Enum predefinido con opciones comunes.  
- Scope: Solo CRUD básico, sin búsqueda avanzada o integraciones adicionales.

**Further Considerations** 
1. Seguridad: Implementar rate limiting y validación de inputs para prevenir ataques.  
2. Escalabilidad: Si crece, migrar storage de fotos a cloud.  
3. UI/UX: Agregar estilos con CSS o librería como Material-UI.  
4. Testing: Agregar unit tests con Jest para backend y frontend.
