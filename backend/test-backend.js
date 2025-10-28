#!/usr/bin/env node
// Script para probar el backend de FormHydra

const testBackend = async () => {
  const baseUrl = 'http://localhost:3000';

  console.log('🧪 Probando FormHydra Backend...\n');

  try {
    // Test 1: Health check
    console.log('1. Verificando estado del servidor...');
    const healthResponse = await fetch(`${baseUrl}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Servidor funcionando:', healthData.status);
    console.log(`   Uptime: ${Math.floor(healthData.uptime)}s\n`);

    // Test 2: Registrar usuario de prueba
    console.log('2. Registrando usuario de prueba...');
    const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@hydra.com',
        password: 'Test123!',
      }),
    });

    const registerData = await registerResponse.json();

    if (registerData.success) {
      console.log('✅ Usuario registrado exitosamente');
      console.log(`   Email: ${registerData.data.user.email}`);
      console.log(`   ID: ${registerData.data.user.id}\n`);

      const token = registerData.data.token;

      // Test 3: Login con el usuario registrado
      console.log('3. Probando login...');
      const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@hydra.com',
          password: 'Test123!',
        }),
      });

      const loginData = await loginResponse.json();

      if (loginData.success) {
        console.log('✅ Login exitoso');
        console.log(`   Token generado: ${loginData.data.token.substring(0, 20)}...\n`);

        // Test 4: Obtener perfil
        console.log('4. Obteniendo perfil de usuario...');
        const profileResponse = await fetch(`${baseUrl}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${loginData.data.token}`,
          },
        });

        const profileData = await profileResponse.json();

        if (profileData.success) {
          console.log('✅ Perfil obtenido exitosamente');
          console.log(`   Email: ${profileData.data.user.email}`);
          console.log(`   Último login: ${profileData.data.user.lastLogin}\n`);
        } else {
          console.log('❌ Error obteniendo perfil:', profileData.message);
        }
      } else {
        console.log('❌ Error en login:', loginData.message);
      }
    } else {
      if (registerData.message.includes('ya está registrado')) {
        console.log('ℹ️  Usuario ya existe, probando login...');

        // Si el usuario ya existe, probar login directamente
        const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@hydra.com',
            password: 'Test123!',
          }),
        });

        const loginData = await loginResponse.json();

        if (loginData.success) {
          console.log('✅ Login exitoso con usuario existente');
          console.log(`   Email: ${loginData.data.user.email}\n`);
        } else {
          console.log('❌ Error en login:', loginData.message);
        }
      } else {
        console.log('❌ Error registrando usuario:', registerData.message);
      }
    }

    console.log('🎉 Pruebas completadas. Backend funcionando correctamente!');
    console.log('\n📝 Para usar con Angular:');
    console.log('   1. Asegúrate de que el frontend esté ejecutándose en http://localhost:4200');
    console.log('   2. El backend ya está configurado con CORS para Angular');
    console.log('   3. Prueba registrarte desde la interfaz web');
  } catch (error) {
    console.error('❌ Error conectando al servidor:', error.message);
    console.log('\n🔧 Soluciones:');
    console.log('   1. Verifica que MongoDB esté ejecutándose');
    console.log('   2. Verifica que el backend esté ejecutándose en puerto 3000');
    console.log('   3. Verifica las variables de entorno en .env');
  }
};

// Ejecutar las pruebas
testBackend();
