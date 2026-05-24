# 📋 LISTA FINAL DE PENDIENTES

## ✅ CAMBIOS APLICADOS EN CÓDIGO (Listos para deploy)

### 1. Vercel Analytics
- ✅ Agregado a `package.json`
- ✅ Importado en `client/src/main.tsx`
- ✅ Componente `<Analytics />` agregado

### 2. Vercel Speed Insights
- ✅ Agregado a `package.json`
- ✅ Importado en `client/src/main.tsx`
- ✅ Componente `<SpeedInsights />` agregado

### 3. Dark Mode Negro Puro (#000000)
- ✅ Div principal: `dark:bg-black`
- ✅ Main content: `dark:bg-black`
- ✅ Footer: `dark:bg-black`

### 4. Texto Blanco Puro en Dark Mode
- ✅ TrustBadges: `text-gray-600 dark:text-white`
- ✅ Footer copyright: `text-gray-600 dark:text-white`
- ✅ Footer "Consultar costos": `text-gray-600 dark:text-white`
- ✅ Todos los textos principales ya usan `text-black dark:text-white`

### 5. Footer Simplificado
- ✅ Texto: "CUIT: 20-19025451-9 · Hoco Original"
- ✅ Eliminado "Importación formal"
- ✅ Eliminado "Pagos por Mercado Pago"
- ✅ Eliminado botón de arrepentimiento
- ✅ Alineado a la izquierda
- ✅ Padding derecho: `pr-20 sm:pr-24`

### 6. Botón "Ver Catálogo" Compacto
- ✅ Ajustado al contenido: `w-auto`
- ✅ Alineado izquierda: `justify-start`

### 7. Imágenes
- ✅ Cache busting v3 + timestamp
- ✅ Headers sin cache en `vercel.json`

---

## ❌ PENDIENTE DE EJECUTAR

### 1. Instalar Dependencias
```bash
cd C:\Users\Usuario\Desktop\Hoco\web\proyecto
pnpm install
```

### 2. Build del Proyecto
```bash
cd client
npm run build
cd ..
```

### 3. Commit de Cambios
```bash
git add -A
git commit -m "Add: Analytics, Speed Insights, Dark mode negro puro, Texto blanco puro"
```

### 4. Conectar a GitHub

#### Paso A: Crear Repositorio en GitHub
1. Ve a https://github.com
2. Login con: **thinktank.png@gmail.com**
3. Click "+" → "New repository"
4. Nombre: `hoco-catalog`
5. Privado o Público (tu elección)
6. **NO** marcar "Initialize with README"
7. Click "Create repository"

#### Paso B: Conectar Local con GitHub
```bash
cd C:\Users\Usuario\Desktop\Hoco\web\proyecto

# Configurar Git (ya hecho)
git config user.name "Tu Nombre"
git config user.email "thinktank.png@gmail.com"

# Remover remote antiguo
git remote remove origin

# Agregar nuevo remote (reemplaza USERNAME)
git remote add origin https://github.com/USERNAME/hoco-catalog.git

# Verificar
git remote -v

# Subir a GitHub
git branch -M main
git push -u origin main
```

**Nota:** Reemplaza `USERNAME` con tu usuario de GitHub.

#### Paso C: Autenticación GitHub
Si pide contraseña, necesitas un Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Scopes: marcar `repo` (todos)
4. Copiar token
5. Usar token como contraseña al hacer push

### 5. Conectar Vercel con GitHub
1. Ve a https://vercel.com/dashboard
2. Tu proyecto "hococatalog"
3. Settings → Git
4. "Connect Git Repository"
5. Selecciona GitHub
6. Busca `hoco-catalog`
7. Click "Connect"

**Resultado:** Cada push a GitHub desplegará automáticamente en Vercel.

---

## 🚀 SCRIPT AUTOMÁTICO

Ejecuta este archivo para hacer todo automáticamente:
```
EJECUTAR_TODO.bat
```

O manualmente:
```bash
cd C:\Users\Usuario\Desktop\Hoco\web\proyecto
taskkill /F /IM node.exe
pnpm install
cd client
npm run build
cd ..
git add -A
git commit -m "Add: Analytics, Speed Insights, Dark mode negro puro, Texto blanco puro"
```

---

## 📊 RESUMEN VISUAL

### Dark Mode - Colores de Texto

#### Antes (con grises):
```
text-gray-400  ← Gris claro
text-gray-600  ← Gris medio
text-muted-foreground  ← Gris variable
```

#### Después (blanco puro):
```
text-white  ← Blanco puro #FFFFFF
```

### Estructura de Colores Final

```
Light Mode:
- Background: Blanco (#FFFFFF)
- Texto: Negro (#000000) y grises

Dark Mode:
- Background: Negro puro (#000000)
- Texto: Blanco puro (#FFFFFF)
- Sin grises intermedios
```

---

## 📁 ARCHIVOS MODIFICADOS

1. `package.json` - Analytics + Speed Insights
2. `client/src/main.tsx` - Componentes integrados
3. `client/src/pages/Home.tsx` - Dark mode negro + textos blancos
4. `client/src/components/TrustBadges.tsx` - Textos blancos
5. `client/src/const.ts` - Cache busting v3
6. `vercel.json` - Headers sin cache

---

## ✅ CHECKLIST FINAL

- [ ] Cerrar proceso de Vercel CLI
- [ ] Ejecutar `pnpm install`
- [ ] Ejecutar `npm run build` en client
- [ ] Hacer commit de cambios
- [ ] Crear repositorio en GitHub
- [ ] Conectar local con GitHub
- [ ] Hacer push a GitHub
- [ ] Conectar Vercel con GitHub
- [ ] Verificar deploy automático
- [ ] Probar dark mode en producción
- [ ] Verificar Analytics en Vercel Dashboard
- [ ] Verificar Speed Insights en Vercel Dashboard

---

## 🎯 RESULTADO ESPERADO

### En Producción:
1. ✅ Dark mode con fondo negro puro
2. ✅ Todos los textos en blanco puro (sin grises)
3. ✅ Analytics funcionando
4. ✅ Speed Insights monitoreando
5. ✅ Footer simplificado y alineado
6. ✅ Botón hero compacto en mobile
7. ✅ Imágenes cargando correctamente

### En GitHub:
1. ✅ Código versionado
2. ✅ Historial de commits
3. ✅ Deploy automático en cada push

---

FIN DE LA LISTA
