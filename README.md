# PePDF Astro

Este proyecto es el frontend de PePDF, construido utilizando [Astro](https://astro.build/) y React.

## 🐳 Despliegue con Docker (Producción)

El proyecto incluye un `Dockerfile` optimizado y multi-etapa que construye el sitio de forma estática (SSG) y lo sirve utilizando Nginx. Esta es la forma más ligera, eficiente y segura para lanzar a producción.

### 1. Construir la Imagen de Docker

En la raíz del proyecto (donde se encuentra el `Dockerfile`), ejecuta el siguiente comando para compilar la imagen:

```bash
docker build -t pepdf-astro .
```

*Esto descargará un entorno de Node, instalará las dependencias vía pnpm, compilará los archivos estáticos a `dist/` y guardará todo un servidor Nginx con solo lo necesario (reduciendo inmensamente el tamaño).*

### 2. Levantar/Ejecutar el Contenedor

Una vez construida, podemos ejecutar la imagen y exponer el puerto. Por defecto Nginx escucha adentro en el puerto `80`. Lo expondremos en el puerto `8080` de nuestra máquina o servidor:

```bash
docker run -d --name pepdf-frontend -p 8080:80 pepdf-astro
```

**Banderas usadas:**
- `-d`: Ejecuta el contenedor en segundo plano (detached mode).
- `--name`: Le da un nombre reconocible al contenedor en lugar de uno generado al azar.
- `-p 8080:80`: Mapea el puerto local 8080 hacia el puerto interno 80 donde escucha Nginx.

### 3. Visualizar y Detener

Ahora puedes abrir el proyecto en cualquier navegador visitando:
[http://localhost:8080](http://localhost:8080)

Para ver los logs que produce la web o posibles errores en tiempo de ejecución:
```bash
docker logs pepdf-frontend
```

Para detener la ejecución del servidor:
```bash
docker stop pepdf-frontend
```

Para destruirlo (por ejemplo, si vas a lanzar una nueva versión actualizada):
```bash
docker rm pepdf-frontend
```

---

## 🛠️ Desarrollo en Local (Sin Docker)

Si deseas levantar o modificar el proyecto de manera local para desarrollo (con recarga rápida HMR):

1. Instala las dependencias:
   ```bash
   pnpm install
   ```
2. Ejecuta el servidor de desarrollo en modo watch (usualmente corre en `http://localhost:4321`):
   ```bash
   pnpm dev
   ```
