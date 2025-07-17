# UTILIZACIÓN DE Nginx
# COMANDOS:
# docker build -t ai_legal_vite_builder:1.0 .
# docker run -d -p 8080:80 --name ai_legal_vite_container ai_legal_vite_builder:1.0
# Dockerfile para una aplicación React con React Router y Nginx
# Etapa 1: Construcción de la aplicación
FROM node:22-alpine AS development-dependencies-env-nginx
# Establecer el directorio de trabajo
WORKDIR /ai-legal-vite-nginx
# Copiar los archivos de configuración de npm
COPY package.json package-lock.json ./
# Instalar las dependencias
RUN npm install
# Copiar el resto de los archivos de la aplicación
COPY . ./
# Construir la aplicación
RUN npm run build
# Etapa 2: Servir la aplicación
FROM nginx:alpine
# Copiar la configuración personalizada de Nginx
COPY default.conf /etc/nginx/conf.d/default.conf
# Copiar los archivos construidos desde la etapa anterior
COPY --from=development-dependencies-env-nginx /ai-legal-vite-nginx/dist /usr/share/nginx/html
# Exponer el puerto en el que Nginx estará escuchando
EXPOSE 80
# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]