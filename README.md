# BogoParche

Aplicación React + Vite preparada para GitHub Pages.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Generar la versión de producción

```bash
npm run build
```

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta a un repositorio llamado `BogoParche`.
2. Usa la rama `main`.
3. En GitHub entra a **Settings → Pages** y selecciona **GitHub Actions** como fuente.
4. Haz `git push` a `main`. El workflow de `.github/workflows/deploy.yml` compilará y publicará la aplicación automáticamente.

La configuración actual usa la ruta base `/BogoParche/`, que corresponde a un repositorio con ese nombre.
