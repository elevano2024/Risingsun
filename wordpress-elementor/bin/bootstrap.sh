#!/usr/bin/env bash
# Bootstrap Elementor rebuild WP (port 8891). Local only.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
WPENV=(npx --yes @wordpress/env@10)

echo "==> Waiting for wp-env CLI..."
"${WPENV[@]}" run cli wp core is-installed >/dev/null

echo "==> Site identity"
"${WPENV[@]}" run cli wp option update blogname "Rising Sun Montessori School (Elementor)"
"${WPENV[@]}" run cli wp option update blogdescription "Elementor Free rebuild — temporary"
"${WPENV[@]}" run cli wp rewrite structure '/%postname%/' --hard
"${WPENV[@]}" run cli wp option update blog_public 0

echo "==> Install/activate Elementor + theme"
# Elementor is gitignored — install from wordpress.org if missing
if ! "${WPENV[@]}" run cli wp plugin is-installed elementor >/dev/null 2>&1; then
	"${WPENV[@]}" run cli wp plugin install elementor --activate
else
	"${WPENV[@]}" run cli wp plugin activate elementor || true
fi
"${WPENV[@]}" run cli wp theme activate rsms-elementor || true

# Disable Elementor default colors/fonts fighting our CSS a bit
"${WPENV[@]}" run cli wp option update elementor_disable_color_schemes yes || true
"${WPENV[@]}" run cli wp option update elementor_disable_typography_schemes yes || true

echo "==> Seed page tree"
"${WPENV[@]}" run cli wp rsms seed-pages || true
"${WPENV[@]}" run cli wp rsms seed-staff || true

echo "==> Done"
"${WPENV[@]}" run cli wp option get home
echo "Admin: http://localhost:8891/wp-admin  (admin / password)"
