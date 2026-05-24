@echo off
title LIMPIAR HISTORIAL Y PUSH
color 0E

echo.
echo ========================================
echo   LIMPIAR HISTORIAL GIT Y PUSH
echo ========================================
echo.
echo ADVERTENCIA: Esto eliminara el historial de Git
echo y creara un commit inicial limpio.
echo.
echo Presiona cualquier tecla para continuar o Ctrl+C para cancelar...
pause >nul

cd C:\Users\Usuario\Desktop\Hoco\web\proyecto

echo.
echo [1/6] Eliminando .git...
rmdir /s /q .git

echo [2/6] Inicializando nuevo repositorio...
git init
git branch -M main

echo [3/6] Configurando usuario...
git config user.email "thinktank.png@gmail.com"
git config user.name "Hoco Catalog"

echo [4/6] Agregando archivos (sin credenciales)...
git add .

echo [5/6] Commit inicial...
git commit -m "Initial commit: Hoco Catalog con Analytics y Speed Insights"

echo [6/6] Conectando con GitHub y push forzado...
git remote add origin https://github.com/illushkinn/hoco-catalog.git
git push -u origin main --force

if errorlevel 1 (
    echo.
    echo [ERROR] Push fallido!
    echo.
    echo Posibles causas:
    echo 1. Necesitas autenticacion (Personal Access Token)
    echo 2. La URL del repositorio es incorrecta
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   COMPLETADO!
echo ========================================
echo.
echo Historial limpio y codigo subido a GitHub.
echo Vercel desplegara automaticamente.
echo.
echo IMPORTANTE: El historial anterior se perdio,
echo pero ahora no hay credenciales expuestas.
echo.
pause
