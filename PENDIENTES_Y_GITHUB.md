# 📋 LISTA DE PENDIENTES Y CONFIGURACIÓN GITHUB

## ❌ PENDIENTES (No aplicados aún)

### 1. Vercel Analytics + Speed Insights
**Estado:** Código modificado pero NO instalado ni desplegado

**Archivos modificados:**
- ✅ `package.json` - Dependencias agregadas
- ✅ `client/src/main.tsx` - Componentes importados

**Falta hacer:**
```bash
pnpm install
cd client
npm run build
```

---

### 2. Dark Mode Negro Puro
**Estado:** Código modificado pero NO desplegado

**Cambios aplicados en código:**
- ✅ `client/src/pages/Home.tsx` - `dark:bg-black` en div principal, main, footer

**Falta:** Deploy a Vercel

---

### 3. Texto Blanco Puro en Dark Mode
**Estado:** ❌ NO APLICADO

**Requerimiento:** Eliminar cualquier color que no sea blanco puro (#FFFFFF) para todo el contenido de texto en dark mode.

**Archivos a modificar:**
- `client/src/pages/Home.tsx`
- `client/src/components/CategorySection.tsx`
- `client/src/components/ProductCard.tsx`
- `client/src/components/HamburgerMenu.tsx`
- `client/src/components/FloatingCart.tsx`
- `client/src/components/TrustBadges.tsx`

**Cambios necesarios:**
- Cambiar `text-black dark:text-white` → `text-black dark:text-white` (ya está bien)
- Cambiar `text-gray-600 dark:text-gray-400` → `text-gray-600 dark:text-white`
- Cambiar `text-muted-foreground` → `text-gray-600 dark:text-white`
- Eliminar cualquier variación de gris en dark mode

---

### 4. Footer Simplificado
**Estado:** ✅ APLICADO en código, falta deploy

**Cambios aplicados:**
- ✅ Texto: "CUIT: 20-19025451-9 · Hoco Original"
- ✅ Eliminado "Importación formal"
- ✅ Eliminado "Pagos por Mercado Pago"
- ✅ Eliminado botón de arrepentimiento
- ✅ Todo alineado a la izquierda
- ✅ Padding derecho para botones flotantes

---

### 5. Botón "Ver Catálogo" Compacto
**Estado:** ✅ APLICADO en código, falta deploy

**Cambios aplicados:**
- ✅ Botón ajustado al contenido en mobile
- ✅ Alineado a la izquierda

---

## 🔗 CONECTAR A GITHUB

### Paso 1: Crear Repositorio en GitHub

1. Ve a https://github.com
2. Inicia sesión con: **thinktank.png@gmail.com**
3. Click en el botón "+" (arriba derecha) → "New repository"
4. Nombre sugerido: `hoco-catalog`
5. Descripción: "Catálogo de productos HOCO - Cables y accesorios"
6. Selecciona: **Private** (o Public si prefieres)
7. **NO** marques "Initialize with README"
8. Click "Create repository"

### Paso 2: Conectar Proyecto Local

Abre una **nueva terminal CMD** (cierra la de Vercel primero) y ejecuta:

```bash
cd C:\Users\Usuario\Desktop\Hoco\web\proyecto

# Configurar usuario Git
git config user.name "Tu Nombre"
git config user.email "thinktank.png@gmail.com"

# Verificar estado actual
git status

# Si hay cambios sin commit, hacerlos
git add -A
git commit -m "Initial commit: Hoco Catalog con Analytics y Dark Mode"

# Conectar con GitHub (reemplaza USERNAME con tu usuario de GitHub)
git remote remove origin
git remote add origin https://github.com/USERNAME/hoco-catalog.git

# Verificar remote
git remote -v

# Subir a GitHub
git branch -M main
git push -u origin main
```

**Nota:** Reemplaza `USERNAME` con tu nombre de usuario de GitHub.

### Paso 3: Conectar Vercel con GitHub

1. Ve a https://vercel.com/dashboard
2. Click en tu proyecto "hococatalog"
3. Settings → Git
4. Click "Connect Git Repository"
5. Selecciona GitHub
6. Busca y selecciona tu repositorio `hoco-catalog`
7. Click "Connect"

**Beneficio:** Ahora cada push a GitHub desplegará automáticamente en Vercel.

---

## 🚀 ORDEN DE EJECUCIÓN RECOMENDADO

### 1. Aplicar cambios de texto blanco puro
```bash
# Ejecutar script que crearé
APLICAR_TEXTO_BLANCO.bat
```

### 2. Instalar dependencias y build
```bash
cd C:\Users\Usuario\Desktop\Hoco\web\proyecto
pnpm install
cd client
npm run build
cd ..
```

### 3. Commit todos los cambios
```bash
git add -A
git commit -m "Add: Analytics, Speed Insights, Dark mode negro puro, Texto blanco puro"
```

### 4. Conectar y subir a GitHub
```bash
# Seguir Paso 2 de "CONECTAR A GITHUB" arriba
```

### 5. Deploy automático
Una vez conectado a GitHub, Vercel desplegará automáticamente.

---

## 📝 RESUMEN DE CAMBIOS TOTALES

### ✅ Aplicados en código (falta deploy):
1. Vercel Analytics integrado
2. Speed Insights integrado
3. Dark mode negro puro (#000000)
4. Footer simplificado y alineado izquierda
5. Botón "Ver Catálogo" compacto
6. Cache busting v3 para imágenes

### ❌ Pendientes de aplicar:
1. **Texto blanco puro en dark mode** (eliminar grises)
2. Instalar dependencias (`pnpm install`)
3. Build del proyecto
4. Conectar a GitHub
5. Deploy final

---

## 🆘 SI ALGO FALLA

### Error: "Proceso de Vercel bloqueando"
1. Cierra la terminal donde está Vercel CLI
2. O presiona Ctrl+C varias veces
3. Abre una nueva terminal CMD

### Error: "Git remote already exists"
```bash
git remote remove origin
# Luego vuelve a agregar el remote
```

### Error: "Authentication failed" al hacer push
1. GitHub ahora requiere Personal Access Token
2. Ve a GitHub → Settings → Developer settings → Personal access tokens
3. Generate new token (classic)
4. Selecciona scopes: `repo` (todos)
5. Copia el token
6. Usa el token como contraseña al hacer push

---

## 📞 CONTACTO CONFIGURADO

- Email Git: thinktank.png@gmail.com
- Proyecto: Hoco Catalog
- Ubicación: C:\Users\Usuario\Desktop\Hoco\web\proyecto

---

FIN DEL DOCUMENTO
