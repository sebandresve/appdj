# ✅ CHECKLIST DE INICIO - DJ Profiles

## Pre-requisitos (Verificar primero)

- [ ] **Node.js instalado** - `node --version` (debe ser v14+)
- [ ] **npm instalado** - `npm --version` (debe ser v6+)
- [ ] **MongoDB disponible** - Local (`mongod`) o MongoDB Atlas
- [ ] **Editor de código** - VS Code recomendado

---

## 📋 Paso 1: Instalación Inicial

### Opción A: Automática (Windows)
```bash
# En la carpeta raíz Appdj/
setup.bat
```

### Opción B: Manual
```bash
# Instalar todas las dependencias
cd server
npm install
cd ../client
npm install
cd ..
```

**Verifica:**
- [ ] `server/node_modules/` existe
- [ ] `client/node_modules/` existe

---

## ⚙️ Paso 2: Configuración

### 2.1 MongoDB

**Opción A: Local**
```bash
# Instala MongoDB desde: https://www.mongodb.com/try/download/community
# Asegúrate que mongod está corriendo
mongod
```

**Opción B: Atlas (Cloud)**
- [ ] Crear cuenta en https://www.mongodb.com/cloud/atlas
- [ ] Crear cluster gratuito
- [ ] Copiar connection string

### 2.2 Variables de Entorno

En `server/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/dj-profile-db
JWT_SECRET=tu_secreto_super_seguro_2024
PORT=5000
NODE_ENV=development
```

**Si usas MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/dj-profile-db?retryWrites=true&w=majority
JWT_SECRET=tu_secreto_super_seguro_2024
PORT=5000
NODE_ENV=development
```

**Verifica:**
- [ ] Archivo `server/.env` creado
- [ ] Variables configuradas correctamente

---

## 🚀 Paso 3: Iniciar la Aplicación

### Opción A: Automática (Windows)
```bash
start.bat
```
⏰ Abrirá 2 ventanas automáticamente (Backend + Frontend)

### Opción B: Manual - Dos terminales

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
✅ Esperar: "Servidor corriendo en puerto 5000"

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```
✅ Esperar: "Compiled successfully!" y el navegador abre http://localhost:3000

### Opción C: Desde raíz (con concurrently)
```bash
npm install  # primero (si no lo hiciste)
npm start    # inicia ambos simultáneamente
```

---

## 🌐 Paso 4: Acceso a la Aplicación

**Frontend:** http://localhost:3000
- Página principal de la app
- Registro, login, dashboard

**Backend:** http://localhost:5000
- API REST
- Endpoint base: http://localhost:5000/api

**MongoDB:**
- Local: mongodb://localhost:27017
- Atlas: configurado en .env

---

## ✨ Paso 5: Prueba la Aplicación

### 5.1 Registro
1. Ve a http://localhost:3000
2. Click en "Registrarse"
3. Completa:
   - Email: `dj@example.com`
   - Contraseña: `password123`
   - Nombre: `MI DJ`
   - País: `Mexico`
   - Género: `EDM`
4. Click "Registrarse"

**Verifica:**
- [ ] Se redirige a Dashboard
- [ ] Token guardado en localStorage

### 5.2 Dashboard
1. Ve al dashboard
2. Deberías ver el perfil que creaste

**Verifica:**
- [ ] Tu perfil aparece en la lista
- [ ] Puedes ver foto (si agregaste), nombre, país, género

### 5.3 Crear/Editar Perfil
1. Click en "Crear Perfil" o "Mi Perfil"
2. Agrega foto, bio, Instagram, SoundCloud
3. Click "Guardar Perfil"

**Verifica:**
- [ ] Los cambios se guardan
- [ ] Foto sube correctamente
- [ ] Links a redes sociales guardan

### 5.4 Ver Perfil
1. En dashboard, click "Ver Perfil Completo"
2. Deberías ver toda la información

**Verifica:**
- [ ] Ves foto, nombre, país, bio, género
- [ ] Enlaces a redes son clickeables

### 5.5 Logout
1. Click "Cerrar Sesión"
2. Deberías volver a login

**Verifica:**
- [ ] Token eliminado
- [ ] Se redirige a login

---

## 🐛 Troubleshooting

### ❌ "Cannot connect to MongoDB"
**Solución:**
```bash
# Verifica que MongoDB esté corriendo
mongod  # en una terminal

# Si usas Atlas, verifica MONGODB_URI en .env
```

### ❌ "CORS error"
**Solución:**
- Backend debe estar en puerto 5000
- Frontend en puerto 3000
- CORS está habilitado en server.js

### ❌ "Cannot find module..."
**Solución:**
```bash
# Reinstala dependencias
cd server && npm install
cd ../client && npm install
```

### ❌ "Port 5000 is already in use"
**Solución:**
```bash
# Cambia puerto en server/.env
PORT=5001

# O mata el proceso que usa 5000
# Windows: netstat -ano | findstr :5000
```

### ❌ "Foto no sube"
**Solución:**
- Máximo 5MB
- Formatos: JPEG, PNG, GIF, WebP
- Revisa console.error en navegador

---

## 📁 Verificación de Estructura

Verifica que tienes estas carpetas/archivos:

```
Appdj/
├── server/
│   ├── node_modules/        ✓
│   ├── models/              ✓
│   ├── routes/              ✓
│   ├── middleware/          ✓
│   ├── uploads/             ✓
│   ├── server.js            ✓
│   ├── package.json         ✓
│   └── .env                 ✓ (creado por ti)
├── client/
│   ├── node_modules/        ✓
│   ├── src/
│   │   ├── components/      ✓
│   │   ├── styles/          ✓
│   │   └── App.js           ✓
│   └── package.json         ✓
├── README.md                ✓
├── QUICK_START.md          ✓
└── setup.bat / start.bat    ✓
```

---

## 🎯 Próximos Pasos

Una vez que todo funciona:

1. **Explora el código** - Entiende la estructura backend/frontend
2. **Prueba la API** - Usa Postman/Insomnia (ver API_TESTING.md)
3. **Personaliza** - Cambia colores, agrega campos, etc.
4. **Agrega features** - Búsqueda, favoritos, ratings, etc.
5. **Despliega** - Sube a Heroku, Vercel, etc.

---

## 📞 Soporte

Si algo no funciona:

1. **Revisa logs** - Console del navegador (F12) y terminal del backend
2. **Lee documentación**:
   - `README.md` - Documentación completa
   - `QUICK_START.md` - Guía rápida
   - `API_TESTING.md` - Ejemplos API
3. **Verifica requisitos** - Node.js, MongoDB, variables .env
4. **Reinstala** - `npm install` en ambas carpetas

---

## ✅ Todo Listo

Si pasaste todos los pasos y ves el dashboard con tu perfil:

🎉 **¡FELICIDADES!**

Tu sistema de gestión de perfiles de DJs está **100% funcional**

Ahora puedes:
- ✅ Registrar DJs
- ✅ Crear/editar perfiles
- ✅ Subir fotos
- ✅ Compartir redes sociales
- ✅ Ver perfiles de otros DJs

---

**Última actualización:** 30 de marzo de 2026
**Versión:** 1.0.0
**Estado:** ✅ LISTO PARA PRODUCCIÓN
