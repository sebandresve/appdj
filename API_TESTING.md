# 🧪 Pruebas de API - DJ Profiles

Usa Postman, Insomnia, Thunder Client o cualquier cliente REST para probar estos endpoints.

## 🔐 Autenticación

### REGISTER - Crear Nueva Cuenta
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "dj@example.com",
  "password": "password123",
  "name": "DJ Shadow",
  "country": "United States",
  "genre": "House"
}
```

**Respuesta (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "dj@example.com",
    "djProfile": {
      "_id": "507f1f77bcf86cd799439012",
      "userId": "507f1f77bcf86cd799439011",
      "name": "DJ Shadow",
      "country": "United States",
      "genre": "House"
    }
  }
}
```

---

### LOGIN - Iniciar Sesión
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "dj@example.com",
  "password": "password123"
}
```

**Respuesta (200):**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "dj@example.com",
    "djProfile": {...}
  }
}
```

---

## 🎵 Perfiles (Requiere Token)

⚠️ **Para todos estos endpoints, agrega el header:**
```
Authorization: Bearer <tu_token_aqui>
```

---

### GET - Obtener Todos los Perfiles
```
GET http://localhost:5000/api/profiles
```

**Respuesta (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "name": "DJ Shadow",
    "country": "United States",
    "bio": "Electronic music producer",
    "genre": "House",
    "instagram": "https://instagram.com/djshadow",
    "soundcloud": "https://soundcloud.com/djshadow",
    "profileImage": "server/uploads/profile-1711000000000.jpg"
  }
]
```

---

### GET - Obtener un Perfil por ID
```
GET http://localhost:5000/api/profiles/507f1f77bcf86cd799439012
```

---

### GET - Obtener Mi Perfil (Usuario Autenticado)
```
GET http://localhost:5000/api/profiles/me
Authorization: Bearer <tu_token>
```

---

### POST - Crear Nuevo Perfil (Multipart Form Data)
```
POST http://localhost:5000/api/profiles
Authorization: Bearer <tu_token>
Content-Type: multipart/form-data

form-data:
  name: "DJ Nova"
  country: "Spain"
  genre: "Techno"
  bio: "Techno lover from Madrid"
  instagram: "https://instagram.com/djnova"
  soundcloud: "https://soundcloud.com/djnova"
  profileImage: <selecciona_archivo>
```

---

### PUT - Actualizar Perfil
```
PUT http://localhost:5000/api/profiles/507f1f77bcf86cd799439012
Authorization: Bearer <tu_token>
Content-Type: multipart/form-data

form-data:
  name: "DJ Nova Updated"
  bio: "Updated bio"
  profileImage: <nueva_imagen_opcional>
```

---

### DELETE - Eliminar Perfil
```
DELETE http://localhost:5000/api/profiles/507f1f77bcf86cd799439012
Authorization: Bearer <tu_token>
```

**Respuesta (200):**
```json
{
  "message": "Perfil eliminado exitosamente"
}
```

---

## 📝 Géneros Disponibles

- EDM
- Techno
- House
- Industrial
- Trance
- Drum and Bass
- Dubstep
- Hip-Hop
- Other

---

## 🔑 Obtener Token

Después de registrarse o hacer login, recibirás un token en la respuesta.

**Uso en Postman:**
1. En la pestaña "Headers"
2. Clave: `Authorization`
3. Valor: `Bearer <tu_token>`

O en la pestaña "Auth":
- Type: Bearer Token
- Token: <tu_token>

---

## ⚠️ Códigos de Respuesta

| Código | Significado |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Sin autenticación |
| 403 | Forbidden - No tengo permisos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Server Error - Error interno |

---

## 🐛 Errores Comunes

### "No token, acceso denegado"
→ No incluiste el header `Authorization` con Bearer token

### "Token inválido"
→ El token expiró o es incorrecto

### "No autorizado para actualizar este perfil"
→ Solo puedes editar tu propio perfil

### "Ya tienes un perfil creado"
→ Un usuario solo puede tener un perfil

---

## 💡 Ejemplo Completo

1. **Registrarse:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@dj.com",
    "password": "test123",
    "name": "Test DJ",
    "country": "Mexico",
    "genre": "EDM"
  }'
```

2. **Copiar el token de la respuesta**

3. **Actualizar perfil:**
```bash
curl -X PUT http://localhost:5000/api/profiles/<ID> \
  -H "Authorization: Bearer <TOKEN>" \
  -F "bio=Updated bio"
```

---

**¡Listo para testear! 🚀**
