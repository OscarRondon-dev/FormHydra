# Configuración para Render

## Pasos para desplegar en Render:

### 1. Preparar proyecto
1. Crear cuenta en https://render.com
2. Conectar repositorio GitHub
3. Crear "Web Service"

### 2. Configuración en Render:
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment:** Node
- **Plan:** Free

### 3. Variables de entorno:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/formhydra
JWT_SECRET=tu_clave_super_secreta_para_produccion_123
JWT_EXPIRES_IN=24h
NODE_ENV=production
```

### 4. Para la base de datos:
- Usa MongoDB Atlas (gratis 512MB)
- O PostgreSQL de Render (gratis)

### 5. URL final:
https://tu-proyecto.onrender.com

## Ventajas:
- 750 horas gratis/mes
- SSL automático
- Fácil configuración
- Buen soporte para Node.js