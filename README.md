# DJ Profiles - Sistema de Administración de Perfiles de DJs

Un sistema full-stack para gestionar perfiles de DJs con autenticación de usuario, CRUD completo, upload de fotos y redes sociales.

## 🎵 Características

- **Autenticación de usuario**: Registro y login con JWT
- **Perfiles de DJs**: Crear, leer, actualizar y eliminar perfiles
- **Upload de fotos**: Almacenamiento local de imágenes de perfil
- **Redes Sociales**: Links a Instagram y SoundCloud
- **Información detallada**: Nombre, país, biografía, género musical
- **Géneros predefinidos**: EDM, Techno, House, Industrial, Trance, Drum and Bass, Dubstep, Hip-Hop
- **Interfaz moderna**: Diseño responsivo con React y CSS

## 📋 Requisitos

- Node.js (v14+)
- npm o yarn
- MongoDB (local o Atlas)

## 🚀 Instalación

### 1. Clonar o descargar el proyecto

```bash
cd Appdj
```

### 2. Instalar Backend

```bash
cd server
npm install
```

Crear archivo `.env` en la carpeta `server/`:

```
MONGODB_URI=mongodb://localhost:27017/dj-profile-db
JWT_SECRET=tu_secreto_super_seguro_aqui
PORT=5000
NODE_ENV=development
```

Si usas MongoDB Atlas, reemplaza `MONGODB_URI` con tu conexión:

```
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/dj-profile-db?retryWrites=true&w=majority
```

### 3. Instalar Frontend

```bash
cd client
npm install
```

## 🏃 Ejecutar la Aplicación

### Terminal 1 - Backend

```bash
cd server
npm run dev
```

El servidor correrá en `http://localhost:5000`

### Terminal 2 - Frontend

```bash
cd client
npm start
```

La aplicación abrirá en `http://localhost:3000`

## 📖 Uso

### 1. Registro

- Ve a la página de registro
- Ingresa email, contraseña, nombre de DJ, país y género musical
- Se crea automáticamente tu perfil inicial

### 2. Login

- Inicia sesión con tus credenciales

### 3. Gestionar tu Perfil

- **Crear**: Click en "Crear Perfil" en la navbar
- **Ver**: Navega por el Dashboard para ver otros perfiles
- **Editar**: En tu perfil, haz click en "Editar Perfil"
- **Eliminar**: Confirma para eliminar tu perfil

### 4. Campos del Perfil

- **Nombre**: Tu nombre artístico como DJ
- **País**: Tu país de origen
- **Género**: Género musical principal (lista predefinida)
- **Biografía**: Descripción corta (máx. 500 caracteres)
- **Instagram**: URL de tu perfil
- **SoundCloud**: URL de tu perfil
- **Foto**: Imagen de perfil (JPEG, PNG, GIF, WebP - máx 5MB)

## 🏗️ Estructura del Proyecto

```
Appdj/
├── server/
│   ├── models/
│   │   ├── User.js          # Modelo de Usuario
│   │   └── DJProfile.js     # Modelo de Perfil DJ
│   ├── routes/
│   │   ├── auth.js          # Rutas de autenticación
│   │   └── profiles.js      # Rutas CRUD de perfiles
│   ├── middleware/
│   │   └── authMiddleware.js # Middleware de JWT
│   ├── uploads/             # Carpeta de fotos de perfil
│   ├── server.js            # Servidor principal
│   ├── package.json
│   └── .env                 # Variables de entorno
│
└── client/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Login.js      # Componente de login
    │   │   ├── Register.js   # Componente de registro
    │   │   ├── Dashboard.js  # Dashboard de perfiles
    │   │   ├── ProfileView.js # Vista de perfil
    │   │   ├── ProfileForm.js # Formulario de perfil
    │   │   ├── ProfileCard.js # Tarjeta de perfil
    │   │   └── Navbar.js     # Barra de navegación
    │   ├── styles/          # Archivos CSS
    │   ├── api.js           # Cliente de API
    │   ├── App.js           # Componente principal
    │   └── index.js
    └── package.json
```

## 🔧 API Endpoints

### Autenticación

- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión

### Perfiles

- `GET /api/profiles` - Obtener todos los perfiles
- `GET /api/profiles/:id` - Obtener un perfil por ID
- `GET /api/profiles/me` - Obtener el perfil del usuario autenticado
- `POST /api/profiles` - Crear nuevo perfil (requiere autenticación)
- `PUT /api/profiles/:id` - Actualizar perfil (requiere ser el propietario)
- `DELETE /api/profiles/:id` - Eliminar perfil (requiere ser el propietario)

## 🔐 Seguridad

- Contraseñas hasheadas con bcryptjs
- JWT para autenticación stateless
- Validación de inputs con express-validator
- Protección de rutas: Solo propietarios pueden editar/eliminar sus perfiles
- CORS habilitado para desarrollo

## 📦 Dependencias principales

### Backend

- **express**: Framework web
- **mongoose**: ODM para MongoDB
- **bcryptjs**: Hashing de contraseñas
- **jsonwebtoken**: Autenticación JWT
- **multer**: Upload de archivos
- **cors**: Manejo de CORS
- **express-validator**: Validación de inputs

### Frontend

- **react**: Librería UI
- **react-router-dom**: Enrutamiento
- **axios**: Cliente HTTP

## 🤝 Consideraciones Futuras

1. **Búsqueda y filtrado**: Buscar DJs por nombre, país o género
2. **Integración social**: Obtener datos desde Instagram/Soundcloud APIs
3. **Sistema de favoritos**: Marcar DJs favoritos
4. **Ratings/Reviews**: Calificaciones de usuario
5. **Almacenamiento en cloud**: Migrar fotos a AWS S3 o Cloudinary
6. **UI mejorada**: Agregar estilos avanzados con Material-UI o Tailwind
7. **Testing**: Unit tests con Jest y E2E con Cypress

## 📝 Licencia

Este proyecto es de código libre para uso personal y educativo.

## 👨‍💻 Autor

Sistema de Gestión de Perfiles de DJs - Proyecto Full-Stack con Node.js, Express, React y MongoDB
