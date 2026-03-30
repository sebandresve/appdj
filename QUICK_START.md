# 🚀 Guía Rápida - DJ Profiles

## Inicio Rápido (5 minutos)

### Paso 1: Instala dependencias

```bash
# Backend
cd server && npm install

# Frontend (en otra terminal)
cd client && npm install
```

### Paso 2: Configura MongoDB

**Opción A - Local**
```bash
# Asegúrate que MongoDB esté corriendo en tu máquina
mongod
```

**Opción B - MongoDB Atlas (Cloud)**
- Crea una cuenta en https://www.mongodb.com/cloud/atlas
- Copia tu connection string
- Pégalo en `server/.env` como `MONGODB_URI`

### Paso 3: Crea el archivo `.env` en `server/`

```
MONGODB_URI=mongodb://localhost:27017/dj-profile-db
JWT_SECRET=mi_secreto_seguro_2024
PORT=5000
NODE_ENV=development
```

### Paso 4: Inicia ambos servidores

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
✅ Backend listo en http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```
✅ Frontend abre en http://localhost:3000

---

## 🎯 Flujo de Uso

### 1. **REGISTRARSE**
   - Click en "Registrarse"
   - Completa: email, contraseña, nombre DJ, país, género
   - ✅ Cuenta creada + perfil inicial generado

### 2. **LOGIN**
   - Usa el email y contraseña registrados
   - ✅ Acceso al dashboard

### 3. **VER PERFILES**
   - Dashboard muestra todos los perfiles de DJs
   - Click en "Ver Perfil Completo" para detalles

### 4. **EDITAR TU PERFIL**
   - Click en "Mi Perfil" en la navbar
   - Click en "Editar Perfil"
   - Modifica cualquier campo (foto, bio, redes, etc.)
   - ✅ Cambios guardados

### 5. **COMPARTIR REDES**
   - En tu perfil, agrega links a Instagram y SoundCloud
   - Los visitantes pueden verlos y hacer click

---

## 📸 Upload de Foto

- Formatos soportados: JPEG, PNG, GIF, WebP
- Tamaño máximo: 5MB
- Se guarda en carpeta `server/uploads/`
- Se muestra en el perfil automáticamente

---

## 🔍 Troubleshooting

### "Cannot connect to MongoDB"
→ Asegúrate que MongoDB está corriendo o que el `MONGODB_URI` es correcto

### "CORS error"
→ El backend debe estar en puerto 5000 y el frontend en 3000

### "Foto no se sube"
→ Verifica el tamaño (max 5MB) y formato (JPEG/PNG/GIF/WebP)

### "Login no funciona"
→ Verifica que el email y contraseña son correctos

---

## 🛠️ Comandos Útiles

```bash
# Backend
npm run dev          # Inicia en modo desarrollo
npm start            # Inicia en modo producción
npm test             # Ejecuta tests

# Frontend
npm start            # Inicia React
npm run build        # Construye versión producción
npm test             # Ejecuta tests
```

---

## 📱 Funcionalidades

✅ Registro e autenticación con JWT  
✅ CRUD completo de perfiles  
✅ Upload de fotos  
✅ Links a redes sociales  
✅ Validación de datos  
✅ Diseño responsivo  
✅ Protección de rutas  

---

## 🎨 Personalización

### Cambiar colores
Edita `client/src/App.css` y los archivos en `client/src/styles/`

### Agregar géneros musicales
Modifica el array `GENRES` en `client/src/components/Register.js`
y actualiza también el enum en `server/models/DJProfile.js`

### Cambiar puerto del servidor
En `server/.env`: modifica `PORT=5000` por otro número

---

## 📖 Documentación Completa

Ver `README.md` para documentación detallada, endpoints API y más información.

---

**¡Listo para gestionar perfiles de DJs!** 🎵✨
