# FormHydra - Proyecto Completo

Sistema de autenticación completo con Angular (frontend) y Node.js + MongoDB (backend) para pruebas con Hydra.

## 🏗️ Arquitectura del Proyecto

```
formHydra/
├── src/                    # Frontend Angular
│   ├── app/
│   │   ├── services/       # Servicios de autenticación
│   │   ├── interceptors/   # Interceptores HTTP
│   │   └── ...
├── backend/                # Backend Node.js
│   ├── models/             # Modelos de MongoDB
│   ├── routes/             # Rutas de la API
│   ├── config/             # Configuración de DB
│   ├── middleware/         # Middlewares
│   └── server.js           # Servidor principal
└── README.md               # Este archivo
```

## 🚀 Inicio Rápido

### 1. **Frontend Angular** (Puerto 4200)
```bash
# En la raíz del proyecto
npm start
```

### 2. **Backend Node.js** (Puerto 3000)
```bash
# En la carpeta backend
cd backend
npm install
npm start
```

### 3. **MongoDB**
Asegúrate de tener MongoDB instalado y ejecutándose:

**Windows:**
```bash
# Instalar MongoDB Community Edition
# Iniciar servicio
net start MongoDB
```

## 📱 Funcionalidades

### Frontend (Angular 17+)
- ✅ Formulario de login reactivo
- ✅ Validaciones en tiempo real
- ✅ Manejo de estados con signals
- ✅ Interfaz responsive y moderna
- ✅ Interceptor HTTP automático
- ✅ Manejo de errores UX-friendly

### Backend (Node.js + Express)
- ✅ API RESTful completa
- ✅ Autenticación JWT
- ✅ Registro y login de usuarios
- ✅ Encriptación de contraseñas (bcrypt)
- ✅ Validación de datos
- ✅ Manejo de errores centralizado
- ✅ CORS configurado para Angular

## 🔧 Configuración

### Variables de entorno (backend/.env)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/formhydra
JWT_SECRET=tu_clave_secreta_super_segura_cambiala_en_produccion
JWT_EXPIRES_IN=24h
```

## 📡 API Endpoints

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Registrar usuario | `{ email, password }` |
| POST | `/api/auth/login` | Iniciar sesión | `{ email, password }` |
| GET | `/api/auth/profile` | Obtener perfil | Headers: `Authorization: Bearer <token>` |
| GET | `/health` | Estado del servidor | - |

---
**⚠️ Nota: Este proyecto tiene fines estrictamente educativos para entender cómo funcionan los ataques de fuerza bruta y cómo protegerse de ellos. No lo utilices en entornos que no sean de tu propiedad.**
**¡Listo para usar con Hydra!** 🎉
