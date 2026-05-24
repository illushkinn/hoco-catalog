@echo off
echo ========================================
echo OPTIMIZAR Y DEPLOY - TODO EN UNO
echo ========================================
echo.
echo Este script va a:
echo 1. Hacer backup de imagenes originales
echo 2. Reemplazar con imagenes optimizadas
echo 3. Commit y push a GitHub
echo 4. Deploy automatico en Vercel
echo.
echo IMPORTANTE: Asegurate de tener las imagenes
echo optimizadas en: client\public\imagenes_hoco_productos_tinypng
echo.
pause

echo.
echo [1/4] Haciendo backup de imagenes originales...
echo.
if exist client\public\imagenes_hoco_productos_backup (
    echo Ya existe un backup, saltando...
) else (
    move client\public\imagenes_hoco_productos client\public\imagenes_hoco_productos_backup
    echo Backup creado!
)

echo.
echo [2/4] Copiando imagenes optimizadas...
echo.
if exist client\public\imagenes_hoco_productos (
    echo El directorio ya existe, eliminando...
    rmdir /s /q client\public\imagenes_hoco_productos
)
move client\public\imagenes_hoco_productos_tinypng client\public\imagenes_hoco_productos
echo Imagenes copiadas!

echo.
echo [3/4] Commit a Git...
echo.
cd client
git add -A
git commit -m "Optimize: Imagenes optimizadas con TinyPNG - reduccion 50-70%%"

echo.
echo [4/4] Push a GitHub...
echo.
git push origin main

echo.
echo ========================================
echo COMPLETADO!
echo ========================================
echo.
echo Vercel esta desplegando automaticamente...
echo Tiempo estimado: 2-3 minutos
echo.
echo Verifica en:
echo - Tu sitio web
echo - Vercel Dashboard
echo - Speed Insights
echo.
echo Mejora esperada:
echo - RES: 35 --^> 65-75 (Good) ✓
echo - FCP: 11.45s --^> 4-5s ✓
echo - LCP: 12.14s --^> 5-6s ✓
echo - Tamano: 30-40 MB --^> 12-15 MB ✓
echo.
pause
