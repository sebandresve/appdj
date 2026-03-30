# 📁 Estructura del Proyecto - DJ Profiles

```
Appdj/
│
├── 📄 README.md                 # Documentación completa
├── 📄 QUICK_START.md           # Guía rápida (5 minutos)
├── 📄 API_TESTING.md           # Ejemplos de pruebas API
├── 📄 PROJECT_STRUCTURE.md     # Este archivo
├── 📄 .gitignore               # Configuración de git
│
├── 📂 server/                  # BACKEND - Node.js + Express
│   ├── 📂 models/              # Esquemas de Mongoose
│   │   ├── User.js             # Modelo de Usuario
│   │   └── DJProfile.js        # Modelo de Perfil DJ
│   │
│   ├── 📂 routes/              # Endpoints API
│   │   ├── auth.js             # /api/auth/* - Registro/Login
│   │   └── profiles.js         # /api/profiles/* - CRUD perfiles
│   │
│   ├── 📂 middleware/          # Middleware personalizado
│   │   └── authMiddleware.js   # Validación de JWT
│   │
│   ├── 📂 uploads/             # 📸 Fotos de perfil (local)
│   │   └── [archivo_imagen]
│   │
│   ├── server.js               # Servidor principal (Express)
│   ├── package.json            # Dependencias backend
│   ├── .env.example            # Plantilla de variables
│   ├── .env                    # Variables de entorno (local)
│   └── .gitignore
│
├── 📂 client/                  # FRONTEND - React
│   ├── 📂 public/              # Archivos estáticos públicos
│   │   └── index.html          # HTML principal
│   │
│   ├── 📂 src/                 # Código fuente React
│   │   ├── 📂 components/      # Componentes React
│   │   │   ├── Login.js        # Formulario de login
│   │   │   ├── Register.js     # Formulario de registro
│   │   │   ├── Dashboard.js    # Panel principal (lista de DJs)
│   │   │   ├── ProfileView.js  # Página de detalle de perfil
│   │   │   ├── ProfileForm.js  # Formulario de crear/editar perfil
│   │   │   ├── ProfileCard.js  # Tarjeta de perfil (mini-vista)
│   │   │   └── Navbar.js       # Barra de navegación
│   │   │
│   │   ├── 📂 styles/          # Archivos CSS
│   │   │   ├── Auth.css        # Estilos login/register
│   │   │   ├── Dashboard.css   # Estilos dashboard
│   │   │   ├── ProfileCard.css # Estilos tarjeta
│   │   │   ├── ProfileView.css # Estilos vista detalle
│   │   │   ├── ProfileForm.css # Estilos formulario
│   │   │   └── Navbar.css      # Estilos navbar
│   │   │
│   │   ├── api.js              # Cliente Axios para API
│   │   ├── App.js              # Componente raíz + Rutas
│   │   ├── App.css             # Estilos globales
│   │   └── index.js            # Punto de entrada React
│   │
│   ├── package.json            # Dependencias frontend
│   ├── .gitignore
│   └── .env                    # Variables de entorno (proxy)
│
└── 📄 CHANGELOG.md (opcional - para versionamiento)
```

---

## 🔌 Flujo de Datos

```
Cliente (React)
     ↓
     ├─ Navbar.js (navegación)
     │
     ├─ Login/Register → authService.js → POST /api/auth
     │   (JWT token guardado en localStorage)
     │
     ├─ Dashboard → profileService.js → GET /api/profiles
     │   (lista todos los perfiles)
     │
     ├─ ProfileForm → profileService.js → POST/PUT /api/profiles
     │   (crear/editar con FormData + foto)
     │
     └─ ProfileView → profileService.js → GET /api/profiles/:id
        (ver detalle + opciones de editar/eliminar)

Servidor (Express)
     ├─ authMiddleware.js (valida JWT)
     ├─ routes/auth.js → models/User.js
     ├─ routes/profiles.js → models/DJProfile.js
     └─ multer (maneja upload de fotos)

Base de Datos (MongoDB)
     ├─ users collection (email, password hash, role)
     └─ djprofiles collection (nombre, país, bio, género, sociales, foto)
```

---

## 📦 Dependencias principales

### Backend (server/package.json)
```json
{
  "express": "servidor web",
  "mongoose": "ODM para MongoDB",
  "bcryptjs": "encriptación de contraseñas",
  "jsonwebtoken": "autenticación JWT",
  "multer": "upload de archivos",
  "cors": "permitir requests desde frontend",
  "dotenv": "variables de entorno",
  "express-validator": "validación de inputs"
}
```

### Frontend (client/package.json)
```json
{
  "react": "librería UI",
  "react-dom": "renderizado React",
  "react-router-dom": "enrutamiento SPA",
  "axios": "cliente HTTP",
  "react-scripts": "build tools"
}
```

---

## 🔄 Ciclo de Desarrollo

1. **Backend Development**
   ```bash
   cd server && npm run dev
   # Reinicia automático con nodemon
   ```

2. **Frontend Development**
   ```bash
   cd client && npm start
   # Hot reload automático
   ```

3. **Testing Manual**
   - Abrir http://localhost:3000
   - Probar registro, login, CRUD
   - Revisar console del navegador (F12)
   - Comprobar Network tab para requests

4. **Testing API**
   - Usar Postman/Insomnia
   - Ver ejemplos en `API_TESTING.md`

---

## 🚀 Despliegue (Producción)

### Backend
```bash
cd server
npm run build  # si aplica
npm start
```

### Frontend
```bash
cd client
npm run build
# Servir archivos en `build/` con servidor estático
```

---

## 📋 Requisitos de Sistema

- **Node.js**: v14+
- **npm**: v6+
- **MongoDB**: v4.4+ (local o Atlas)
- **RAM**: 512MB mínimo
- **Espacio**: 500MB libre

---

## ✅ Checklist de Instalación

- [ ] Node.js instalado (`node --version`)
- [ ] MongoDB corriendo (`mongod` o Atlas conectado)
- [ ] Backend instalado (`cd server && npm install`)
- [ ] Frontend instalado (`cd client && npm install`)
- [ ] `.env` creado en `server/` con variables
- [ ] Backend iniciado (`npm run dev` en server)
- [ ] Frontend iniciado (`npm start` en client)
- [ ] Acceso a http://localhost:3000

---

**¿Preguntas? Revisa README.md, QUICK_START.md o API_TESTING.md** 📚
