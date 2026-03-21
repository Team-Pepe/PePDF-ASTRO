# ==========================================
# Etapa 1: Construcción (Builder)
# ==========================================
FROM node:20-alpine AS builder

# ARG para build-time variables (Vite/Astro necesita estas)
ARG PUBLIC_API_URL=http://localhost:8000
ARG PUBLIC_API_TIMEOUT=10000
ARG PUBLIC_APP_NAME=PePDF
ARG PUBLIC_APP_VERSION=0.0.1

# Convertir ARG a ENV para que Vite/Astro las vea durante el build
ENV PUBLIC_API_URL=$PUBLIC_API_URL
ENV PUBLIC_API_TIMEOUT=$PUBLIC_API_TIMEOUT
ENV PUBLIC_APP_NAME=$PUBLIC_APP_NAME
ENV PUBLIC_APP_VERSION=$PUBLIC_APP_VERSION

RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

# Build con variables inyectadas en el HTML
RUN pnpm run build


# ==========================================
# Etapa 2: Servidor (Production/Runner)
# ==========================================
FROM nginx:alpine AS runner

RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]