@echo off
REM Script para instalar e iniciar DJ Profiles en Windows

echo.
echo ======================================
echo    DJ Profiles - Setup Script
echo ======================================
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no está instalado o no está en PATH
    echo Descarga Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js detectado
echo.

REM Instalar dependencias del servidor
echo Instalando dependencias del backend...
cd server
call npm install
if errorlevel 1 (
    echo ERROR: Fallo en la instalación del backend
    pause
    exit /b 1
)
cd ..
echo ✓ Backend instalado

REM Instalar dependencias del cliente
echo.
echo Instalando dependencias del frontend...
cd client
call npm install
if errorlevel 1 (
    echo ERROR: Fallo en la instalación del frontend
    pause
    exit /b 1
)
cd ..
echo ✓ Frontend instalado

echo.
echo ======================================
echo    Instalación completada
echo ======================================
echo.
echo Próximos pasos:
echo.
echo 1. Configura el archivo .env en la carpeta 'server'
echo    Ejemplo:
echo    MONGODB_URI=mongodb://localhost:27017/dj-profile-db
echo    JWT_SECRET=tu_secreto_seguro
echo    PORT=5000
echo.
echo 2. Asegúrate que MongoDB esté corriendo
echo.
echo 3. Para iniciar el proyecto, ejecuta:
echo    a) npm run dev  (para iniciar backend + frontend juntos)
echo    o
echo    b) npm run server  (terminal 1 - backend)
echo       npm run client  (terminal 2 - frontend)
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause
