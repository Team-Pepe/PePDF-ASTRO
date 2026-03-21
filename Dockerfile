# ==========================================
# Etapa 1: Construcción (Builder)
# ==========================================
FROM node:20-alpine AS builder

# ARG para build-time variables (Vite necesita estas)
ARG VITE_API_URL=http://localhost:8000
ARG VITE_API_TIMEOUT=10000
ARG VITE_APP_NAME=PePDF
ARG VITE_APP_VERSION=0.0.1

# Convertir ARG a ENV para que Vite las vea durante el build
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_TIMEOUT=$VITE_API_TIMEOUT
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_APP_VERSION=$VITE_APP_VERSION

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