@echo off
title SETUP COMPLETO - Hoco Catalog + GitHub
color 0B

echo.
echo ================================================================
echo   SETUP COMPLETO - HOCO CATALOG
echo ================================================================
echo.
echo Este script va a:
echo 1. Instalar dependencias (Analytics + Speed Insights)
echo 2. Hacer build del proyecto
echo 3. Commit de todos los cambios
echo 4. Preparar para subir a GitHub
echo.
echo IMPORTANTE: Antes de ejecutar, asegurate de:
echo - Haber creado el repositorio en GitHub
echo - Tener tu usuario de GitHub listo
echo.
echo Presiona cualquier tecla para continuar o Ctrl+C para cancelar...
pause >nul

echo.
echo ================================================================
echo   FASE 1: LIMPIEZA
echo ================================================================
echo.

echo [1/3] Cerrando procesos Node...
taskkill /F /IM node.exe /T 2>nul
timeout /t 2 /nobreak >nul

echo [2/3] Cerrando procesos Vercel...
taskkill /F /IM vercel.exe /T 2>nul
timeout /t 2 /nobreak >nul

echo [3/3] Limpiando procesos restantes...
wmic process where "commandline like '%%vercel%%'" delete 2>nul
timeout /t 2 /nobreak >nul

echo.
echo ================================================================
echo   FASE 2: INSTALACION
echo ================================================================
echo.

echo [1/1] Instalando dependencias con pnpm...
echo.
call pnpm install
if errorlevel 1 (
    echo.
    echo [ERROR] Instalacion fallida!
    echo.
    echo Posibles soluciones:
    echo 1. Verifica que pnpm este instalado: pnpm --version
    echo 2. Intenta: npm install -g pnpm
    echo 3. O usa npm en vez de pnpm
    echo.
    pause
    exit /b 1
)

echo.
echo ================================================================
echo   FASE 3: BUILD
echo ================================================================
echo.

echo [1/2] Navegando a client...
cd client

echo [2/2] Construyendo proyecto...
echo.
call npm run build
if errorlevel 1 (
    echo.
    echo [ERROR] Build fallido!
    cd ..
    pause
    exit /b 1
)

echo [OK] Build completado exitosamente
cd ..

echo.
echo ================================================================
echo   FASE 4: GIT COMMIT
echo ================================================================
echo.

echo [1/3] Configurando usuario Git...
git config user.email "thinktank.png@gmail.com"
git config user.name "Hoco Catalog"

echo [2/3] Agregando cambios...
git add -A

echo [3/3] Haciendo commit...
git commit -m "Add: Vercel Analytics + Speed Insights + Dark mode negro puro + Texto blanco puro"

echo.
echo ================================================================
echo   FASE 5: CONFIGURACION GITHUB
echo ================================================================
echo.

echo AHORA NECESITAS CONFIGURAR GITHUB MANUALMENTE:
echo.
echo 1. Crea el repositorio en GitHub:
echo    - Ve a: https://github.com/new
echo    - Nombre: hoco-catalog
echo    - Privado o Publico (tu eleccion)
echo    - NO marques "Initialize with README"
echo    - Click "Create repository"
echo.
echo 2. Copia la URL del repositorio que GitHub te muestra
echo    Ejemplo: https://github.com/TU_USUARIO/hoco-catalog.git
echo.

set /p GITHUB_URL="Pega aqui la URL de tu repositorio GitHub: "

if "%GITHUB_URL%"=="" (
    echo.
    echo [ERROR] No ingresaste una URL
    echo.
    echo Puedes configurar GitHub manualmente despues con:
    echo git remote add origin TU_URL
    echo git push -u origin main
    echo.
    pause
    exit /b 0
)

echo.
echo [1/3] Removiendo remote antiguo...
git remote remove origin 2>nul

echo [2/3] Agregando nuevo remote...
git remote add origin %GITHUB_URL%

echo [3/3] Verificando remote...
git remote -v

echo.
echo ================================================================
echo   FASE 6: PUSH A GITHUB
echo ================================================================
echo.

echo Intentando subir a GitHub...
echo.
echo NOTA: Si pide usuario/contraseña:
echo - Usuario: tu usuario de GitHub
echo - Contraseña: usa un Personal Access Token (no tu contraseña)
echo.
echo Para crear un token:
echo 1. GitHub -^> Settings -^> Developer settings -^> Personal access tokens
echo 2. Generate new token (classic)
echo 3. Marca: repo (todos)
echo 4. Copia el token y usalo como contraseña
echo.

git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo [ADVERTENCIA] Push fallido
    echo.
    echo Posibles causas:
    echo 1. Necesitas autenticacion (Personal Access Token)
    echo 2. La URL del repositorio es incorrecta
    echo 3. El repositorio ya tiene contenido
    echo.
    echo Puedes intentar manualmente:
    echo git push -u origin main
    echo.
) else (
    echo.
    echo [OK] Codigo subido a GitHub exitosamente!
)

echo.
echo ================================================================
echo   COMPLETADO!
echo ================================================================
echo.
echo CAMBIOS APLICADOS:
echo.
echo [Codigo]
echo - Vercel Analytics instalado
echo - Speed Insights instalado
echo - Dark mode negro puro (#000000)
echo - Texto blanco puro en dark mode
echo - Footer simplificado
echo - Boton hero compacto
echo.
echo [Git]
echo - Commit realizado
echo - Conectado a GitHub: %GITHUB_URL%
echo - Push completado (si no hubo errores)
echo.
echo ================================================================
echo   SIGUIENTE PASO: CONECTAR VERCEL
echo ================================================================
echo.
echo 1. Ve a: https://vercel.com/dashboard
echo 2. Tu proyecto: hococatalog
echo 3. Settings -^> Git
echo 4. Click "Connect Git Repository"
echo 5. Selecciona GitHub
echo 6. Busca: hoco-catalog
echo 7. Click "Connect"
echo.
echo RESULTADO: Cada push a GitHub desplegara automaticamente!
echo.
echo ================================================================
echo.
echo Presiona cualquier tecla para salir...
pause >nul
