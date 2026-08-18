#!/bin/bash
# ============================================================================
#  DÉMARRER LE SITE SUR UN MAC
#  Double-cliquez simplement sur ce fichier : le site s'ouvre dans votre
#  navigateur. Pour arrêter, fermez la fenêtre noire (Terminal) qui s'ouvre.
# ============================================================================
cd "$(dirname "$0")" || exit 1
PORT=8000
echo ""
echo "  Le site va s'ouvrir dans votre navigateur…"
echo "  Adresse : http://localhost:$PORT/index.html"
echo ""
echo "  ► Pour ARRÊTER le site : fermez cette fenêtre."
echo ""
( sleep 1; open "http://localhost:$PORT/index.html" ) &
python3 -m http.server "$PORT"
