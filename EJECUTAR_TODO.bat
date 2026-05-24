@echo off
title EJECUTAR TODO - Hoco Catalog
color 0E

echo.
echo ========================================================
echo   INSTALACION Y BUILD COMPLETO
echo ========================================================
echo.
echo Este script va a:
echo 1. Cerrar todos los procesos Node/Vercel
echo 2. Instalar dependencias de Vercel
echo 3. Hacer build del proyecto
echo 4. Hacer commit de los cambios
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

echo.
echo [1/7] Matando procesos Node...
taskkill /F /IM node.exe /T 2>nul
timeout /t 2 /nobreak >nul

echo [2/7] Matando procesos Vercel...
taskkill /F /IM vercel.exe /T 2>nul
timeout /t 2 /nobreak >nul

echo [3/7] Limpiando procesos restantes...
wmic process where "commandline like '%%vercel%%'" delete 2>nul
timeout /t 2 /nobreak >nul

echo [4/7] Instalando dependencias...
echo.
call pnpm install
if errorlevel 1 (
    echo.
    echo [ERROR] Instalacion fallida!
    echo Intenta ejecutar manualmente: pnpm install
    pause
    exit /b 1
)

echo.
echo [5/7] Construyendo proyecto...
echo.
cd client
call npm run build
if errorlevel 1 (
    echo.
    echo [ERROR] Build fallido!
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo [6/7] Agregando cambios a Git...
git add -A

echo [7/7] Haciendo commit...
git commit -m "Add: Vercel Analytics + Speed Insights + Dark mode negro puro"

echo.
echo ========================================================
echo   COMPLETADO EXITOSAMENTE!
echo ========================================================
echo.
echo CAMBIOS APLICADOS:
echo.
echo [Analytics]
echo - Vercel Analytics instalado y configurado
echo - Speed Insights instalado y configurado
echo.
echo [Dark Mode]
echo - Background negro puro desde seccion de busqueda
echo - Footer con fondo negro puro
echo.
echo [Footer]
echo - Todo alineado a la izquierda
echo - Padding derecho para botones flotantes
echo - Texto simplificado: "Hoco Original"
echo.
echo [Hero]
echo - Boton "Ver Catalogo" compacto en mobile
echo.
echo ========================================================
echo   SIGUIENTE PASO
echo ========================================================
echo.
echo Ve a: https://vercel.com/dashboard
echo Proyecto: hococatalog
echo Click en: Redeploy
echo.
echo Presiona cualquier tecla para salir...
pause >nul
