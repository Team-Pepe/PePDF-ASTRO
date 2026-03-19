# ==========================================
# Etapa 1: Construcción (Builder)
# ==========================================
FROM node:20-alpine AS builder

# Habilitar corepack para usar pnpm de manera nativa sin instalar globalmente con npm
RUN corepack enable

# Establecer nuestro directorio base dentro del contenedor
WORKDIR /app

# Copiar manifiestos de dependencias primero para aprovechar el caché de capas de Docker
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias exactas usando pnpm (congelando el lockfile)
RUN pnpm install --frozen-lockfile

# Copiar el resto del código y archivos de configuración
COPY . .

# Compilar la aplicación (genera el sitio web servible en la carpeta "dist/")
RUN pnpm run build


# ==========================================
# Etapa 2: Servidor (Production/Runner)
# ==========================================
FROM nginx:alpine AS runner

# Remover la página por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar nuestra configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar únicamente los archivos estáticos desde la etapa "builder"
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80 (puerto interno del contenedor por defecto para Nginx)
EXPOSE 80

# Iniciar el servidor de Nginx y mantenerlo corriendo en primer plano
CMD ["nginx", "-g", "daemon off;"]