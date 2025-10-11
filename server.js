// ========================================
// SERVIDOR DE SINCRONIZACIÓN DE VIDEO VR
// Sistema de control en tiempo real para Krpano
// ========================================

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",  // En producción, especifica los dominios permitidos
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

// Estado actual del video compartido entre todos los clientes
let videoState = {
  playing: false,
  time: 0,
  timestamp: Date.now(),
  scene: 'posterscene'  // Escena actual
};

// Información detallada de clientes conectados
let connectedClients = new Map();

// Servir archivos estáticos (para el panel de admin)
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
  res.send(`
    <h1>Servidor de Sincronización Krpano</h1>
    <p>Servidor funcionando correctamente</p>
    <p>Clientes conectados: ${connectedClients.size}</p>
    <p>Estado actual: ${videoState.playing ? 'Reproduciendo' : 'Pausado'}</p>
    <p>Tiempo: ${videoState.time.toFixed(2)}s</p>
    <br>
    <a href="/admin.html">Ir al panel de administración</a>
  `);
});

// Gestión de conexiones Socket.IO
io.on('connection', (socket) => {
  // Registrar nuevo cliente con información detallada
  const clientInfo = {
    id: socket.id,
    connected: true,
    sceneReady: false,
    synced: false,
    connectedAt: new Date().toISOString(),
    ip: socket.handshake.address
  };
  
  connectedClients.set(socket.id, clientInfo);
  
  console.log(`✅ Cliente conectado: ${socket.id}`);
  console.log(`📊 Total de clientes: ${connectedClients.size}`);
  
  // Enviar estado actual al nuevo cliente inmediatamente
  socket.emit('sync-state', videoState);
  
  // Marcar cliente como sincronizado después de recibir estado
  setTimeout(() => {
    const client = connectedClients.get(socket.id);
    if (client) {
      client.synced = true;
      connectedClients.set(socket.id, client);
      broadcastClientList();
    }
  }, 1000);
  
  // Enviar lista de clientes a todos
  broadcastClientList();
  
  // ============================================
  // COMANDOS DEL ADMINISTRADOR
  // ============================================
  
  // Comando: Reproducir video
  socket.on('admin-play', (data) => {
    videoState = {
      playing: true,
      time: data.time || 0,
      timestamp: Date.now(),
      scene: 'videopano'
    };
    
    // Enviar comando a TODOS los clientes
    io.emit('video-play', videoState);
    
    console.log(`▶️  PLAY enviado a todos los clientes`);
    console.log(`   Tiempo: ${videoState.time.toFixed(2)}s`);
  });
  
  // Comando: Pausar video
  socket.on('admin-pause', (data) => {
    videoState = {
      playing: false,
      time: data.time || videoState.time,
      timestamp: Date.now(),
      scene: videoState.scene
    };
    
    io.emit('video-pause', videoState);
    
    console.log(`⏸️  PAUSE enviado a todos los clientes`);
    console.log(`   Tiempo: ${videoState.time.toFixed(2)}s`);
  });
  
  // Comando: Buscar posición en el video
  socket.on('admin-seek', (data) => {
    videoState.time = data.time;
    videoState.timestamp = Date.now();
    
    io.emit('video-seek', { 
      time: data.time,
      timestamp: Date.now()
    });
    
    console.log(`⏩ SEEK a ${data.time.toFixed(2)}s`);
  });
  
  // Comando: Reiniciar video
  socket.on('admin-restart', () => {
    videoState = {
      playing: true,
      time: 0,
      timestamp: Date.now(),
      scene: 'videopano'
    };
    
    io.emit('video-restart', videoState);
    
    console.log(`🔄 RESTART - Video reiniciado`);
  });
  
  // Comando: Volver a la escena inicial (poster)
  socket.on('admin-go-poster', () => {
    videoState = {
      playing: false,
      time: 0,
      timestamp: Date.now(),
      scene: 'posterscene'
    };
    
    io.emit('video-go-poster', videoState);
    
    console.log(`🏠 Volviendo a la escena inicial`);
  });
  
  // Comando: Entrar en modo VR todos los clientes
  socket.on('admin-enter-vr', () => {
    io.emit('video-enter-vr');
    console.log(`🥽 Activando modo VR en todos los clientes`);
  });
  
  // ============================================
  // ACTUALIZACIÓN DE ESTADO DESDE CLIENTES
  // ============================================
  
  // Los clientes pueden reportar su estado actual
  socket.on('client-update', (data) => {
    // Opcional: Actualizar el estado si viene de un cliente autorizado
    // console.log(`Cliente ${socket.id} reporta: ${data.time}s`);
  });
  
  // Cliente reporta que la escena está lista
  socket.on('client-scene-ready', (data) => {
    const client = connectedClients.get(socket.id);
    if (client) {
      client.sceneReady = data.sceneReady;
      connectedClients.set(socket.id, client);
      console.log(`📹 Cliente ${socket.id.substring(0,8)}... escena lista`);
      broadcastClientList();
    }
  });
  
  // ============================================
  // DESCONEXIÓN
  // ============================================
  
  socket.on('disconnect', () => {
    connectedClients.delete(socket.id);
    console.log(`❌ Cliente desconectado: ${socket.id}`);
    console.log(`📊 Total de clientes: ${connectedClients.size}`);
    
    // Notificar a todos sobre la lista actualizada de clientes
    broadcastClientList();
  });
});

// Función para enviar lista de clientes a todos
function broadcastClientList() {
  const clientsArray = Array.from(connectedClients.values());
  io.emit('clients-list', { 
    count: connectedClients.size,
    clients: clientsArray
  });
}

// Iniciar servidor
http.listen(PORT, '0.0.0.0', () => {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 SERVIDOR DE SINCRONIZACIÓN KRPANO INICIADO');
  console.log('='.repeat(50));
  console.log(`📡 Servidor escuchando en puerto: ${PORT}`);
  console.log(`🎛️  Panel de admin: /admin.html`);
  console.log('='.repeat(50) + '\n');
});

// Manejo de errores
process.on('uncaughtException', (err) => {
  console.error('❌ Error no capturado:', err);
});

process.on('SIGINT', () => {
  console.log('\n👋 Cerrando servidor...');
  process.exit(0);
});


