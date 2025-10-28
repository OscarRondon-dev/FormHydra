# 🚀 Guía Completa de Despliegue - FormHydra Backend

## 🏆 Opción Recomendada: Railway

### ¿Por qué Railway?
- ✅ **MongoDB incluido** (1GB gratis)
- ✅ **Despliegue automático** desde GitHub
- ✅ **SSL/HTTPS** automático
- ✅ **Variables de entorno** fáciles
- ✅ **500 horas gratis**/mes
- ✅ **Sin tarjeta de crédito** requerida inicialmente

---

## 📋 Pasos para Desplegar en Railway

### **Paso 1: Preparar tu código**

1. **Subir a GitHub:**
   ```bash
   # En la carpeta backend/
   git init
   git add .
   git commit -m "Initial backend commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/formhydra-backend.git
   git push -u origin main
   ```

### **Paso 2: Desplegar en Railway**

1. **Crear cuenta:** https://railway.app
2. **Conectar GitHub:** Autorizar Railway a acceder a tus repos
3. **Crear nuevo proyecto:** "Deploy from GitHub repo"
4. **Seleccionar:** tu repositorio formhydra-backend
5. **Railway detectará automáticamente:** Node.js

### **Paso 3: Configurar Base de Datos**

1. **En tu proyecto Railway:**
   - Click en "Add Service"
   - Seleccionar "Database"
   - Elegir "MongoDB"
   - Railway creará la BD automáticamente

### **Paso 4: Variables de Entorno**

En Railway, ir a "Variables" y agregar:

```env
PORT=3000
MONGODB_URI=${{MongoDB.DATABASE_URL}}
JWT_SECRET=tu_clave_super_secreta_para_produccion_railway_2024
JWT_EXPIRES_IN=24h
NODE_ENV=production
FRONTEND_URL=https://tu-frontend.vercel.app
```

### **Paso 5: Despliegue**

Railway desplegará automáticamente y te dará una URL como:
```
https://formhydra-backend-production.railway.app
```

---

## 🌐 Alternativas Gratuitas

### **Render.com**
- 750 horas gratis/mes
- Necesitas MongoDB Atlas separado
- SSL automático

### **Vercel (solo para APIs pequeñas)**
- Ilimitado para hobby
- Funciones serverless
- Mejor para APIs simples

### **Heroku (plan gratuito limitado)**
- 550 horas gratis/mes
- Requiere tarjeta de crédito
- MongoDB Atlas separado

---

## 📱 Actualizar Frontend para Producción

Una vez desplegado el backend, actualiza tu Angular app:

```typescript
// src/app/services/auth.service.ts
export class AuthService {
  private readonly apiUrl = environment.production 
    ? 'https://tu-backend.railway.app/api/auth'
    : 'http://localhost:3000/api/auth';
}
```

```typescript
// src/environments/environment.ts
export const environment = {
  production: false
};

// src/environments/environment.prod.ts
export const environment = {
  production: true
};
```

---

## 🔧 Comandos Útiles

### **Ver logs en Railway:**
```bash
railway logs
```

### **Conectar a BD en Railway:**
```bash
railway connect MongoDB
```

### **Redeploy:**
```bash
git push origin main
# Railway redespliega automáticamente
```

---

## 📊 Costos y Límites

### **Railway (Gratis):**
- 500 horas de compute/mes
- 1GB de MongoDB
- 1GB de ancho de banda
- Después: $5/mes

### **MongoDB Atlas (Gratis):**
- 512MB de almacenamiento
- Clusters compartidos
- Para siempre gratis

---

## 🌍 URLs Finales

Después del despliegue tendrás:

- **Backend API:** `https://tu-proyecto.railway.app`
- **Health Check:** `https://tu-proyecto.railway.app/health`
- **Registro:** `https://tu-proyecto.railway.app/api/auth/register`
- **Login:** `https://tu-proyecto.railway.app/api/auth/login`

¡Tu backend estará disponible 24/7 en internet! 🎉