@echo off
echo ========================================
echo DEPLOY IMAGENES OPTIMIZADAS
echo ========================================
echo.
echo Este script va a:
echo 1. Agregar cambios a Git
echo 2. Hacer commit
echo 3. Push a GitHub
echo 4. Vercel desplegara automaticamente
echo.
pause

echo.
echo [1/3] Agregando cambios a Git...
echo.
cd client
git add -A

echo.
echo [2/3] Haciendo commit...
echo.
git commit -m "Optimize: Imagenes optimizadas con TinyPNG - reduccion 50-70%%"

echo.
echo [3/3] Subiendo a GitHub...
echo.
git push origin main

echo.
echo ========================================
echo DEPLOY COMPLETADO!
echo ========================================
echo.
echo Vercel esta desplegando automaticamente...
echo.
echo Proximos pasos:
echo 1. Espera 2-3 minutos
echo 2. Verifica tu sitio en Vercel
echo 3. Revisa Speed Insights para ver la mejora
echo.
echo Mejora esperada:
echo - RES: 35 --^> 65-75 (Good)
echo - LCP: 12s --^> 5-6s
echo - Tamano: 30-40 MB --^> 12-15 MB
echo.
pause
