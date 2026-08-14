# Local-only scratch (do not commit contents)

This folder exists so local WordPress rebuild notes, DB dumps, export
zips, and temporary files have a place to live **without being committed**.

- Everything under `wordpress-elementor/private/` is gitignored.
- Only this README is tracked (keeps the folder in the repo).
- Never commit production DB dumps or SFTP passwords.
- Setup guide: [../README.md](../README.md)
