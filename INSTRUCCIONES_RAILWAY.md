# 🚀 GUÍA COMPLETA: Desplegar en Railway.app

## 📋 Contenido de esta Carpeta

Esta carpeta `github/` contiene TODOS los archivos que debes subir a GitHub:

```
github/
├── server.js              → Servidor Node.js
├── package.json           → Dependencias
├── .gitignore             → Archivos a ignorar
├── README.md              → Documentación
├── public/
│   └── admin.html         → Panel de administración
└── INSTRUCCIONES_RAILWAY.md → Este archivo
```

---

## ⚡ PROCESO COMPLETO (PASO A PASO)

### 📍 **PARTE 1: SUBIR A GITHUB**

#### Opción A: Usando GitHub Desktop (MÁS FÁCIL) ⭐

1. **Descarga GitHub Desktop:**
   ```
   https://desktop.github.com/
   ```

2. **Instala y abre GitHub Desktop**

3. **Inicia sesión con tu cuenta de GitHub**
   - Si no tienes cuenta, créala en: https://github.com/signup

4. **Crear nuevo repositorio:**
   - Click en `File` → `New Repository`
   - Name: `krpano-sync-server`
   - Local Path: Selecciona la carpeta `github` que creamos
   - Click en `Create Repository`

5. **Hacer el primer commit:**
   - En la parte inferior izquierda:
   - Summary: `Initial commit`
   - Click en `Commit to main`

6. **Publicar en GitHub:**
   - Click en `Publish repository`
   - Desmarca "Keep this code private" (o déjalo marcado si quieres)
   - Click en `Publish repository`

7. **¡Listo!** Tu código ya está en GitHub

---

#### Opción B: Usando la Terminal (Para usuarios avanzados)

1. **Abre PowerShell o CMD**

2. **Navega a la carpeta github:**
   ```powershell
   cd "C:\Users\u15a66\Documents\PROJECTS\_Interno\Krpano\Video VR\Ejemplo3.2\github"
   ```

3. **Inicializar Git:**
   ```bash
   git init
   ```

4. **Configurar tu usuario (primera vez):**
   ```bash
   git config --global user.name "Tu Nombre"
   git config --global user.email "tu@email.com"
   ```

5. **Agregar archivos:**
   ```bash
   git add .
   ```

6. **Hacer commit:**
   ```bash
   git commit -m "Initial commit"
   ```

7. **Crear repositorio en GitHub:**
   - Ve a: https://github.com/new
   - Repository name: `krpano-sync-server`
   - Click en `Create repository`

8. **Conectar y subir:**
   ```bash
   git remote add origin https://github.com/TU-USUARIO/krpano-sync-server.git
   git branch -M main
   git push -u origin main
   ```

---

### 📍 **PARTE 2: DESPLEGAR EN RAILWAY**

#### 1. **Ir a Railway:**
   ```
   https://railway.app/
   ```

#### 2. **Crear cuenta:**
   - Click en `Login`
   - Selecciona `Login with GitHub`
   - Autoriza Railway a acceder a tu GitHub

#### 3. **Crear nuevo proyecto:**
   - Click en `New Project`
   - Selecciona `Deploy from GitHub repo`

#### 4. **Seleccionar repositorio:**
   - Busca `krpano-sync-server`
   - Click en el repositorio

#### 5. **Esperar el despliegue:**
   - Railway detectará automáticamente que es Node.js
   - Instalará las dependencias
   - Iniciará el servidor
   - Verás logs en tiempo real
   - Espera 2-3 minutos

#### 6. **Generar dominio público:**
   - Una vez desplegado, click en tu proyecto
   - Ve a la pestaña `Settings`
   - En la sección `Networking`, click en `Generate Domain`
   - Railway te dará una URL como: `krpano-sync-production.up.railway.app`

#### 7. **¡LISTO! Tu servidor ya está en línea** 🎉

---

### 📍 **PARTE 3: CONFIGURAR TU WEB (TOUR.HTML)**

#### 1. **Abre tu archivo `tour.html`** (el que está en tu proyecto Krpano)

#### 2. **Busca la línea 98** (aproximadamente) y modifica:

**ANTES:**
```javascript
const SERVER_URL = 'http://localhost:3000';
```

**DESPUÉS:**
```javascript
const SERVER_URL = 'https://TU-URL-DE-RAILWAY.up.railway.app';
```

**Ejemplo real:**
```javascript
const SERVER_URL = 'https://krpano-sync-production.up.railway.app';
```

#### 3. **Guarda el archivo**

---

### 📍 **PARTE 4: SUBIR A HOSTINGER**

#### 1. **Accede a tu panel de Hostinger**

#### 2. **Ve a File Manager** (Administrador de archivos)

#### 3. **Navega a `public_html/`**

#### 4. **Sube estos archivos:**
   ```
   - tour.html (el que acabas de modificar)
   - krpano.xml
   - krpano.js
   - carpeta video/
   - carpeta plugins/
   - carpeta skin/
   ```

#### 5. **Crea una carpeta `admin`** dentro de `public_html/`

#### 6. **Dentro de la carpeta `admin`, sube el archivo:**
   - `admin.html` (está en la carpeta `github/public/`)
   - Pero ANTES, ábrelo y en la línea 426, asegúrate que diga:
   ```javascript
   const SERVER_URL = window.location.origin;
   ```
   - Si no, cámbialo por tu URL de Railway:
   ```javascript
   const SERVER_URL = 'https://TU-URL-DE-RAILWAY.up.railway.app';
   ```

---

## 🎯 URLs FINALES

Después de completar todos los pasos:

| Servicio | URL |
|----------|-----|
| **Servidor** | `https://tu-proyecto.up.railway.app` |
| **Panel Admin** | `https://tu-dominio.com/admin/admin.html` |
| **Clientes (tour)** | `https://tu-dominio.com/tour.html` |

---

## ✅ VERIFICAR QUE TODO FUNCIONA

### 1. **Probar el servidor:**
   - Abre en tu navegador: `https://tu-proyecto.up.railway.app`
   - Deberías ver: "Servidor de Sincronización Krpano"

### 2. **Probar el panel admin:**
   - Abre: `https://tu-dominio.com/admin/admin.html`
   - Deberías ver el panel con el indicador verde "Conectado"

### 3. **Probar los clientes:**
   - Abre: `https://tu-dominio.com/tour.html`
   - Deberías ver el indicador verde en la esquina superior derecha

### 4. **Probar la sincronización:**
   - Abre el panel admin en una pestaña
   - Abre tour.html en otra pestaña
   - Desde el panel admin, click en "Reproducir"
   - El video debería iniciar en la otra pestaña

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### ❌ "Build failed" en Railway

**Causa:** Error en el código o dependencias

**Solución:**
1. Ve a la pestaña `Deployments` en Railway
2. Click en el último deployment
3. Revisa los logs para ver el error
4. Si dice "node: command not found", agrega en Settings → Variables:
   ```
   NODE_VERSION=18
   ```

---

### ❌ El servidor se despliega pero no funciona

**Solución:**
1. Ve a `Settings` → `Variables`
2. Verifica que exista la variable `PORT` (Railway la crea automáticamente)
3. Si no existe, agrégala manualmente

---

### ❌ Los clientes no se conectan (indicador rojo)

**Posibles causas:**

1. **La URL en tour.html es incorrecta**
   - Verifica que sea HTTPS (no HTTP)
   - Copia la URL exacta de Railway
   - Incluye `https://` al inicio

2. **Problema de CORS**
   - Revisa los logs en Railway
   - Si dice "CORS error", el servidor ya está configurado para aceptar todas las conexiones

3. **El servidor no está corriendo**
   - Ve a Railway y verifica que el deployment esté activo (verde)

---

### ❌ "This site can't be reached"

**Solución:**
1. Verifica que generaste el dominio en Railway (`Generate Domain`)
2. Espera 1-2 minutos después de generar el dominio
3. Asegúrate de usar HTTPS (no HTTP)

---

## 📊 COMANDOS ÚTILES DE GIT (para actualizaciones futuras)

Si haces cambios en el código y quieres actualizar:

```bash
# 1. Ver cambios
git status

# 2. Agregar cambios
git add .

# 3. Hacer commit
git commit -m "Descripción de los cambios"

# 4. Subir a GitHub
git push

# Railway detectará los cambios y volverá a desplegar automáticamente
```

---

## 💰 COSTOS

### Railway (Gratis):
- ✅ $5 USD de crédito gratis al mes
- ✅ Suficiente para un proyecto pequeño/mediano
- ✅ Después de $5, puedes agregar una tarjeta (cobran por uso)

### Consumo aproximado:
- Servidor activo 24/7: ~$1-3 USD/mes
- Si tienes tráfico bajo, probablemente siempre será gratis

---

## 🎓 RESUMEN RÁPIDO

1. ✅ Sube la carpeta `github/` a GitHub (usando GitHub Desktop o terminal)
2. ✅ Ve a Railway.app y despliega desde tu repositorio
3. ✅ Genera un dominio en Railway
4. ✅ Copia la URL de Railway
5. ✅ Actualiza `tour.html` con esa URL
6. ✅ Sube `tour.html` y archivos de Krpano a Hostinger
7. ✅ Sube `admin.html` a `public_html/admin/` en Hostinger
8. ✅ ¡Prueba todo!

---

## 🆘 NECESITAS AYUDA?

1. **Logs de Railway:** Ve a Deployments → Click en el deployment → Mira los logs
2. **Consola del navegador:** Presiona F12 en tu navegador para ver errores
3. **Status del servidor:** Abre la URL de Railway para ver si está activo

---

## 🎉 ¡FELICIDADES!

Una vez completado, tendrás:
- ✅ Servidor Node.js corriendo 24/7 en Railway
- ✅ Panel de administración accesible desde internet
- ✅ Clientes sincronizados en tiempo real
- ✅ Todo funcionando de forma profesional

---

**¡Disfruta tu sistema de video VR sincronizado!** 🥽🎬

