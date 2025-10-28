# FormHydra Backend

Backend API construido con Node.js, Express y MongoDB para el proyecto FormHydra.

## 🚀 Características

- ✅ Autenticación JWT
- ✅ Registro y login de usuarios
- ✅ Validación de datos
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Conexión a MongoDB
- ✅ Manejo de errores centralizado
- ✅ CORS configurado para Angular
- ✅ Variables de entorno

## 📋 Prerequisitos

- Node.js (v16 o superior)
- MongoDB (local o MongoDB Atlas)
- npm o yarn

## 🛠️ Instalación

1. **Instalar dependencias:**
   ```bash
   cd backend
   npm install
   ```

2. **Configurar variables de entorno:**
   - Copia el archivo `.env` y ajusta las variables según tu configuración
   - Para MongoDB local: `mongodb://localhost:27017/formhydra`
   - Para MongoDB Atlas: Usa tu string de conexión

3. **Iniciar MongoDB (si usas local):**
   ```bash
   mongod
   ```

4. **Ejecutar el servidor:**
   ```bash
   # Desarrollo con nodemon
   npm run dev
   
   # Producción
   npm start
   ```

## 📡 Endpoints

### Autenticación

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Registrar usuario | `{ email, password }` |
| POST | `/api/auth/login` | Iniciar sesión | `{ email, password }` |
| GET | `/api/auth/profile` | Obtener perfil | Headers: `Authorization: Bearer <token>` |

### Otros

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Información de la API |
| GET | `/health` | Estado del servidor |

## 🔧 Configuración

### Variables de entorno (.env)

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/formhydra
JWT_SECRET=tu_clave_secreta_super_segura
JWT_EXPIRES_IN=24h
```

### Base de datos

El servidor se conecta automáticamente a MongoDB. La base de datos y colecciones se crean automáticamente.

## 📝 Estructura del proyecto

```
backend/
├── config/
│   └── database.js     # Configuración de MongoDB
├── middleware/
│   └── errorHandler.js # Manejo de errores
├── models/
│   └── User.js         # Modelo de usuario
├── routes/
│   └── auth.js         # Rutas de autenticación
├── .env                # Variables de entorno
├── package.json        # Dependencias
├── server.js           # Servidor principal
└── README.md           # Este archivo
```

## 🧪 Pruebas

Puedes probar los endpoints usando herramientas como:
- Postman
- Insomnia
- Thunder Client (extensión de VS Code)
- curl

### Ejemplo de registro:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123"}'
```

### Ejemplo de login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123"}'
```

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt (costo 12)
- Tokens JWT con expiración
- Validación de entrada con express-validator
- CORS configurado
- Variables de entorno para datos sensibles

## 📚 Dependencias principales

- **express**: Framework web
- **mongoose**: ODM para MongoDB
- **bcryptjs**: Encriptación de contraseñas
- **jsonwebtoken**: Autenticación JWT
- **cors**: Cross-Origin Resource Sharing
- **express-validator**: Validación de datos
- **dotenv**: Variables de entorno

## 🚨 Notas importantes

1. **Cambiar JWT_SECRET**: En producción, usa una clave secreta fuerte
2. **MongoDB**: Asegúrate de que MongoDB esté ejecutándose
3. **CORS**: Configurado para `http://localhost:4200` (Angular dev server)
4. **Validaciones**: Las contraseñas deben tener al menos 6 caracteres con mayúscula, minúscula y número