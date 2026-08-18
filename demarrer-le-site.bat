@echo off
REM ==========================================================================
REM   DEMARRER LE SITE SUR WINDOWS
REM   Double-cliquez simplement sur ce fichier : le site s'ouvre dans votre
REM   navigateur. Pour arreter, fermez la fenetre noire qui s'ouvre.
REM ==========================================================================
cd /d "%~dp0"
echo.
echo   Le site va s'ouvrir dans votre navigateur...
echo   Adresse : http://localhost:8000/index.html
echo.
echo   Pour ARRETER le site : fermez cette fenetre.
echo.
start "" "http://localhost:8000/index.html"
python -m http.server 8000
pause
