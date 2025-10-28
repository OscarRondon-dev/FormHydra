# 🚀 Guía de Despliegue en Railway

Este proyecto está listo para desplegarse en Railway con frontend Angular y backend Node.js/MongoDB.

## 📋 Prerrequisitos

1. Cuenta en [Railway](https://railway.app)
2. Repositorio en GitHub con tu código
3. Verificar que tengas los archivos de configuración:
   - `backend/package.json`
   - `package.json` (frontend)
   - Archivos de entorno configurados

## 🔧 Preparación del Repositorio

### 1. Crear repositorio en GitHub

```bash
# Inicializar git si no lo has hecho
git init

# Agregar todos los archivos
git add .

# Hacer commit inicial
git commit -m "Initial commit: Angular + Node.js + MongoDB auth system"

# Conectar con repositorio remoto
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git

# Subir código
git push -u origin main
```

### 2. Estructura actual del proyecto
```
formHydra/
├── backend/          # API Node.js
│   ├── package.json
│   ├── server.js
│   ├── models/
│   └── routes/
├── src/              # Frontend Angular
├── package.json      # Frontend dependencies
└── angular.json
```

## 🚀 Despliegue en Railway

### Opción 1: Proyecto Separado (Recomendado)

#### Backend (API)
1. Ve a [Railway](https://railway.app) → New Project
2. Selecciona "Deploy from GitHub repo"
3. Conecta tu repositorio
4. En configuración:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. **Variables de entorno**:
   ```
   NODE_ENV=production
   JWT_SECRET=tu_jwt_secret_super_seguro_aqui
   MONGODB_URI=mongodb://localhost:27017/formhydra
   PORT=3000
   CORS_ORIGIN=https://tu-frontend.up.railway.app
   ```

6. **Agregar MongoDB**:
   - En tu proyecto → Add service → Database → MongoDB
   - Copia la URL de conexión y actualiza `MONGODB_URI`

#### Frontend (Angular)
1. Crear nuevo proyecto en Railway
2. Conectar el mismo repositorio
3. En configuración:
   - **Root Directory**: `/` (raíz del proyecto)
   - **Build Command**: `npm run build`
   - **Start Command**: `npx http-server dist/form-hydra -p $PORT`

4. **Variables de entorno**:
   ```
   NODE_ENV=production
   API_URL=https://tu-backend.up.railway.app/api/auth
   ```

### Opción 2: Monorepo (Un solo proyecto)

1. Crear archivo `railway.toml` en la raíz:

```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm run start:production"

[[services]]
name = "backend"
source = "backend"

[services.build]
buildCommand = "npm install"
startCommand = "npm start"

[[services]]
name = "frontend" 
source = "."

[services.build]
buildCommand = "npm install && npm run build"
startCommand = "npx http-server dist/form-hydra -p $PORT"
```

2. Agregar script en `package.json` principal:
```json
{
  "scripts": {
    "start:production": "concurrently \"npm --prefix backend start\" \"npx http-server dist/form-hydra -p 4200\""
  }
}
```

## 🔧 Configuración Adicional

### 1. Actualizar CORS en backend
Archivo `backend/server.js`:
```javascript
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    credentials: true
}));
```

### 2. Construir para producción
```bash
# Frontend
npm run build

# Verificar dist/
ls dist/form-hydra/
```

### 3. Variables de entorno finales

**Backend Railway**:
```
NODE_ENV=production
JWT_SECRET=super_secret_jwt_key_aqui
MONGODB_URI=mongodb+srv://railway:password@cluster.mongodb.net/formhydra
PORT=3000
CORS_ORIGIN=https://formhydra-frontend.up.railway.app
```

**Frontend Railway**:
```
NODE_ENV=production
```

## 🧪 Verificación del Despliegue

### 1. Comprobar Backend
```bash
curl https://tu-backend.up.railway.app/api/auth/test
```

### 2. Comprobar Frontend
- Visita: `https://tu-frontend.up.railway.app`
- Prueba registro/login
- Verifica consola del navegador para errores

### 3. Logs de Railway
- Ve a tu proyecto → View Logs
- Revisa errores de construcción o runtime

## 🐛 Solución de Problemas

### Error: "Cannot connect to MongoDB"
- Verifica `MONGODB_URI` en variables de entorno
- Asegúrate que MongoDB service esté ejecutándose

### Error: "CORS policy"
- Actualiza `CORS_ORIGIN` con la URL correcta del frontend
- Verifica que no hay URLs hardcodeadas

### Error: "Build failed"
- Revisa que `package.json` tenga todas las dependencias
- Verifica que Angular build funcione localmente

### Error: "API calls fail"
- Confirma que `environment.prod.ts` tiene la URL correcta
- Verifica que backend esté desplegado y funcionando

## 📝 URLs Finales

Después del despliegue tendrás:
- **Backend**: `https://formhydra-backend.up.railway.app`
- **Frontend**: `https://formhydra-frontend.up.railway.app`
- **MongoDB**: Interno de Railway

## 🔒 Seguridad

1. **JWT_SECRET**: Genera una clave segura
2. **MongoDB**: Usa credenciales fuertes
3. **CORS**: Configura origins específicos
4. **Environment Variables**: Nunca hardcodees secrets

## 🎉 ¡Listo!

Tu aplicación de autenticación está desplegada y lista para usar. Puedes acceder desde cualquier lugar y los usuarios pueden registrarse e iniciar sesión.

Railway maneja:
- ✅ SSL automático
- ✅ Escalamiento automático
- ✅ Backups de MongoDB
- ✅ Monitoreo y logs
- ✅ Custom domains (opcional)