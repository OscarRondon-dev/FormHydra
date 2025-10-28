# Configuración para Railway

## Pasos para desplegar en Railway:

### 1. Preparar tu código para Railway
1. Crear cuenta en https://railway.app
2. Conectar tu repositorio GitHub
3. Railway detectará automáticamente Node.js

### 2. Variables de entorno necesarias:
```env
PORT=3000
MONGODB_URI=${{MongoDB.DATABASE_URL}}
JWT_SECRET=tu_clave_super_secreta_para_produccion_123
JWT_EXPIRES_IN=24h
NODE_ENV=production
```

### 3. Comandos de Railway:
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login a Railway
railway login

# Inicializar proyecto
railway init

# Desplegar
railway up
```

### 4. Tu aplicación estará disponible en:
https://tu-proyecto.railway.app

## Configuración automática:
- Railway detecta package.json
- Ejecuta npm install automáticamente
- Usa el comando "start" de package.json
- Proporciona MongoDB gratuito
- SSL/HTTPS automático