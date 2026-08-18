#!/bin/bash
# ============================================================================
#  DÉMARRER LE SITE SUR LINUX
#  Lancez ce fichier depuis un terminal :  ./demarrer-le-site.sh
# ============================================================================
cd "$(dirname "$0")" || exit 1
PORT=8000
echo ""
echo "  Ouvrez cette adresse dans votre navigateur :"
echo "  http://localhost:$PORT/index.html"
echo ""
echo "  ► Pour ARRÊTER le site : appuyez sur Ctrl + C."
echo ""
( sleep 1; xdg-open "http://localhost:$PORT/index.html" >/dev/null 2>&1 ) &
python3 -m http.server "$PORT"
