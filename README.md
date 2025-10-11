# 🎬 Servidor de Sincronización de Video VR para Krpano

Sistema de control en tiempo real que permite sincronizar la reproducción de videos VR de Krpano entre múltiples clientes desde un panel de administración centralizado.

## 🚀 Despliegue en Railway

Este servidor está optimizado para desplegarse en Railway.app de forma gratuita.

### URL del Servidor
Después de desplegar en Railway, tu servidor estará disponible en:
```
https://tu-proyecto.up.railway.app
```

### Panel de Administración
Accede al panel de control en:
```
https://tu-proyecto.up.railway.app/admin.html
```

## 📋 Características

- ✅ Sincronización en tiempo real con WebSockets
- ✅ Panel de administración web incluido
- ✅ Compensación automática de latencia de red
- ✅ Reconexión automática
- ✅ Monitoreo de clientes conectados
- ✅ Control completo de reproducción (Play, Pause, Seek, Restart)
- ✅ Activación remota de modo VR

## 🔧 Configuración

El servidor se configura automáticamente usando las variables de entorno de Railway.

### Puerto
Railway asigna automáticamente el puerto mediante `process.env.PORT`

### CORS
Configurado para aceptar conexiones desde cualquier origen. Para producción, se recomienda configurar dominios específicos.

## 📝 Comandos Socket.IO

### Comandos del Administrador
- `admin-play` - Reproducir video
- `admin-pause` - Pausar video
- `admin-seek` - Cambiar posición del video
- `admin-restart` - Reiniciar desde el inicio
- `admin-go-poster` - Volver a vista previa
- `admin-enter-vr` - Activar VR en todos los clientes

### Eventos para Clientes
- `sync-state` - Recibe el estado inicial al conectar
- `video-play` - Comando de reproducción
- `video-pause` - Comando de pausa
- `video-seek` - Comando de búsqueda
- `video-restart` - Comando de reinicio
- `video-go-poster` - Volver a escena inicial
- `video-enter-vr` - Activar modo VR
- `client-count` - Número de clientes conectados

## 🌐 Uso

### En los clientes (tour.html)
Actualiza la URL del servidor en tu archivo `tour.html`:
```javascript
const SERVER_URL = 'https://tu-proyecto.up.railway.app';
```

### Panel de Administración
El panel se encuentra en `/admin.html` y también debe configurarse con la URL del servidor.

## 📊 Estado del Servidor

El servidor mantiene un estado global con:
- Estado de reproducción (playing/paused)
- Tiempo actual del video
- Timestamp de la última actualización
- Escena actual (posterscene/videopano)
- Número de clientes conectados

## 🔒 Seguridad

Para producción se recomienda:
1. Configurar CORS con dominios específicos
2. Agregar autenticación al panel de administración
3. Usar HTTPS (Railway lo incluye automáticamente)
4. Implementar rate limiting

## 📄 Licencia

MIT

