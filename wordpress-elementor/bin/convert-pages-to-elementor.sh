#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
npx --yes @wordpress/env@10 run cli wp eval-file wp-content/rsms-bin/rebuild-all-native.php
