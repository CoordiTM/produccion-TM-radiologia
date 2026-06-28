# Sistema de Producción Diaria - TM

Sistema de registro de producción diaria para Tecnólogos Médicos en Radiología.

## Stack Tecnológico

- **React 18** + Create React App
- **Firebase** (Authentication + Firestore)
- **Tailwind CSS** (via CDN)
- **GitHub Pages** (hosting)
- **Lucide React** (iconos)

## Características

- Registro de producción por sala, turno y fecha
- Panel de administración completo (CRUD usuarios, salas, exámenes especiales)
- Reportes mensuales en PDF (calendario individual) y TXT
- Catálogo de exámenes especiales editable por admin
- Gestión de salas dinámica
- Exportación de reportes generales e individuales

## Configuración Inicial

### 1. Clonar y entrar al proyecto

```bash
git clone https://github.com/TU_USUARIO/produccion-tm-github.git
cd produccion-tm-github
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

Edita `src/firebase.js` y reemplaza con tus credenciales de Firebase:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};
```

> **Nota:** Si usas la **misma base de datos** del proyecto anterior, copia las mismas credenciales.

### 4. Configurar `homepage` en `package.json`

Reemplaza `TU_USUARIO` y `NOMBRE_REPO` con tus datos:

```json
"homepage": "https://TU_USUARIO.github.io/NOMBRE_REPO"
```

### 5. Ejecutar en local (opcional)

```bash
npm start
```

## Despliegue en GitHub Pages

### Opción A: Automático (GitHub Actions) - RECOMENDADO

1. Sube el código a GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Ve a **Settings → Pages** en tu repo de GitHub

3. En **Build and deployment → Source**, selecciona **GitHub Actions**

4. El workflow se ejecutará automáticamente. Ve a la pestaña **Actions** para ver el progreso.

5. Tu app estará en: `https://TU_USUARIO.github.io/NOMBRE_REPO`

### Opción B: Manual (gh-pages package)

```bash
npm run deploy
```

Esto construye y despliega a la rama `gh-pages`.

## Estructura del Proyecto

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow de GitHub Actions
├── public/
│   └── index.html              # HTML principal con Tailwind CDN
├── src/
│   ├── App.js                  # Componente principal (corregido)
│   ├── firebase.js             # Configuración Firebase
│   ├── index.css               # Estilos + Tailwind directives
│   ├── index.js                # Punto de entrada React
│   └── services/
│       └── dbService.js        # Funciones CRUD Firestore
├── package.json
└── README.md
```

## Notas Importantes

- **GitHub Pages solo sirve contenido estático.** Todo el "backend" está en Firebase (Firestore).
- **No uses React Router con BrowserRouter** en GitHub Pages. El proyecto actual usa estados internos, no rutas, así que funciona nativamente.
- Si en el futuro necesitas rutas, usa **HashRouter** (`/#/ruta`) en lugar de BrowserRouter.
- El build de React genera archivos estáticos en la carpeta `build/` que GitHub Pages sirve directamente.

## Solución de Problemas

### Blank page después del deploy

Verifica que `homepage` en `package.json` coincida exactamente con el nombre de tu repo.

### Error "Failed to compile"

Asegúrate de que todas las dependencias estén instaladas:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Firebase no conecta

Verifica que las credenciales en `src/firebase.js` sean correctas y que Firestore tenga las reglas de seguridad adecuadas.
