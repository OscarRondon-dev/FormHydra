#!/bin/bash
# Script para preparar el backend para despliegue

echo "🚀 Preparando FormHydra Backend para despliegue..."

# Crear .gitignore si no existe
if [ ! -f .gitignore ]; then
    echo "📝 Creando .gitignore..."
    cat > .gitignore << 'EOF'
node_modules/
.env
*.log
.DS_Store
Thumbs.db
.vscode/
.idea/
temp/
tmp/
EOF
fi

# Verificar package.json
echo "📦 Verificando package.json..."
if [ -f package.json ]; then
    echo "✅ package.json encontrado"
else
    echo "❌ package.json no encontrado"
    exit 1
fi

# Verificar .env.example
echo "🔧 Creando .env.example..."
cat > .env.example << 'EOF'
PORT=3000
MONGODB_URI=mongodb://localhost:27017/formhydra
JWT_SECRET=tu_clave_secreta_super_segura
JWT_EXPIRES_IN=24h
NODE_ENV=development
FRONTEND_URL=http://localhost:4200
EOF

echo "✅ Archivos preparados para despliegue"
echo ""
echo "📋 Próximos pasos:"
echo "1. Sube tu código a GitHub"
echo "2. Ve a https://railway.app"
echo "3. Conecta tu repositorio"
echo "4. Agrega las variables de entorno"
echo "5. ¡Tu API estará live!"
echo ""
echo "🌍 Después del despliegue, tu API estará en:"
echo "https://tu-proyecto.railway.app"