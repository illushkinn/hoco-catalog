@echo off
title PUSH FINAL - Sin Credenciales AWS
color 0C

echo.
echo ========================================
echo   PUSH FINAL A GITHUB
echo ========================================
echo.

cd C:\Users\Usuario\Desktop\Hoco\web\proyecto

echo [1/4] Agregando .gitignore...
git add .gitignore

echo [2/4] Commit de cambios...
git commit -m "Add: gitignore para excluir credenciales AWS + Analytics + Speed Insights"

echo [3/4] Verificando archivos a subir...
git status

echo.
echo IMPORTANTE: Los archivos .project-config.json NO se subiran
echo porque contienen credenciales de AWS.
echo.
echo [4/4] Push a GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo [ERROR] Push fallido!
    echo.
    echo GitHub sigue bloqueando porque los commits ANTERIORES
    echo ya tienen las credenciales.
    echo.
    echo SOLUCION: Necesitas limpiar el historial de Git.
    echo Ejecuta: LIMPIAR_HISTORIAL.bat
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   PUSH EXITOSO!
echo ========================================
echo.
echo Vercel desplegara automaticamente en 1-2 minutos.
echo.
pause
