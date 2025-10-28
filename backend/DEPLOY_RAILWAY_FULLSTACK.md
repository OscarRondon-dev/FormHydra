# 🚄 Despliegue Completo en Railway

## Backend + Frontend + MongoDB en Railway

### 📦 Estructura recomendada para Railway:

```
formHydra/
├── backend/          # API Node.js
│   ├── package.json
│   ├── server.js
│   └── ...
├── frontend/         # Angular App (opcional: mover src aquí)
│   ├── package.json
│   ├── angular.json
│   └── src/
└── package.json      # Root (para monorepo)
```

---

## 🎯 Opción 1: Dos Proyectos Separados (Recomendado)

### **Proyecto 1: Backend**
1. **Repositorio:** `formhydra-backend`
2. **Tipo:** Web Service
3. **Framework:** Node.js
4. **Puerto:** 3000
5. **URL final:** `https://formhydra-backend.railway.app`

### **Proyecto 2: Frontend**
1. **Repositorio:** `formhydra-frontend` 
2. **Tipo:** Static Site
3. **Framework:** Angular
4. **Build:** `ng build`
5. **URL final:** `https://formhydra-frontend.railway.app`

### **Proyecto 3: Base de Datos**
1. **Tipo:** MongoDB
2. **Automático:** Railway lo configura
3. **Conexión:** Variable de entorno automática

---

## 🔧 Configuración del Frontend para Railway

### **1. Preparar Angular para producción:**

```json
// package.json del frontend
{
  "name": "formhydra-frontend",
  "scripts": {
    "build": "ng build --configuration production",
    "start": "ng serve --host 0.0.0.0 --port $PORT",
    "build:railway": "ng build --configuration production --output-path dist"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
```

### **2. Variables de entorno del frontend:**

```env
# En Railway - Frontend
NODE_ENV=production
PORT=3000
API_URL=https://formhydra-backend.railway.app
```

### **3. Actualizar configuración Angular:**

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://formhydra-backend.railway.app/api/auth'
};

// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/auth'
};
```

---

## 🎯 Opción 2: Monorepo (Una sola repo)

### **Estructura del proyecto:**

```
formHydra-fullstack/
├── apps/
│   ├── backend/      # API
│   └── frontend/     # Angular
├── package.json      # Root package.json
└── railway.json      # Configuración Railway
```

### **railway.json para monorepo:**

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run start:backend",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## 📋 Pasos para Desplegar Todo en Railway

### **Paso 1: Subir Frontend a GitHub**

```bash
# En la raíz de formHydra/
git add .
git commit -m "Add frontend for Railway deployment"
git push origin main

# O crear repo separado para frontend
cd src/
git init
git add .
git commit -m "Angular frontend for Railway"
git remote add origin https://github.com/TU_USUARIO/formhydra-frontend.git
git push -u origin main
```

### **Paso 2: En Railway - Backend**

1. **Nuevo proyecto:** "Deploy from GitHub"
2. **Seleccionar:** formhydra-backend
3. **Agregar servicio:** MongoDB
4. **Variables de entorno:**
   ```env
   MONGODB_URI=${{MongoDB.DATABASE_URL}}
   JWT_SECRET=tu_clave_super_secreta_railway
   FRONTEND_URL=https://formhydra-frontend.railway.app
   NODE_ENV=production
   ```

### **Paso 3: En Railway - Frontend**

1. **Nuevo proyecto:** "Deploy from GitHub"
2. **Seleccionar:** formhydra-frontend (o formhydra con root directory: src/)
3. **Build Command:** `npm run build`
4. **Start Command:** `npm start` (para Angular serve) o usar Nginx
5. **Variables de entorno:**
   ```env
   API_URL=https://formhydra-backend.railway.app
   NODE_ENV=production
   ```

---

## 🌍 URLs Finales

Después del despliegue tendrás:

- **🎨 Frontend:** `https://formhydra-frontend.railway.app`
- **🔧 Backend API:** `https://formhydra-backend.railway.app`
- **📊 Health Check:** `https://formhydra-backend.railway.app/health`
- **🗄️ MongoDB:** Conexión automática entre servicios

---

## 💰 Costos en Railway

### **Plan Gratuito:**
- **Backend:** ~100-200 horas/mes
- **Frontend:** ~50-100 horas/mes
- **MongoDB:** 1GB gratis
- **Total:** Suficiente para desarrollo y pruebas

### **Plan Hobby ($5/mes):**
- **Compute:** 500 horas/mes
- **Ancho de banda:** 100GB/mes
- **Ideal para:** Producción pequeña

---

## ⚡ Ventajas de Railway Full-Stack

1. **🔄 Despliegue automático** desde GitHub
2. **🔗 URLs automáticas** con SSL
3. **📊 Logs centralizados** para todo
4. **🔧 Variables de entorno** compartidas
5. **📈 Escalabilidad** automática
6. **🛡️ CORS** configurado entre servicios

---

## 🚀 Alternativa: Nginx para Frontend

Si prefieres servir el Angular como archivos estáticos:

```dockerfile
# En formHydra/frontend/Dockerfile
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
```

¡Railway manejará todo automáticamente! 🎉