@echo off
REM Script rápido para iniciar DJ Profiles

echo.
echo ================================================
echo    DJ Profiles - Iniciando...
echo ================================================
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no está instalado
    pause
    exit /b 1
)

REM Iniciar backend y frontend en paralelo
echo Iniciando Backend (http://localhost:5000)...
start cmd /k "cd server && npm run dev"

timeout /t 3

echo Iniciando Frontend (http://localhost:3000)...
start cmd /k "cd client && npm start"

echo.
echo ============================================
echo ✓ Aplicación iniciada
echo ============================================
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Presiona Enter para cerrar esta ventana...
pause
