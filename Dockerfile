# Base Image
FROM node:18 AS build

WORKDIR /app

# Copiar archivos esenciales
COPY package.json yarn.lock ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY tsconfig.app.json ./

# Instalar dependencias
RUN yarn install

# Copiar todo el código fuente
COPY . .

# Construir la aplicación React para producción
RUN yarn build


# Imagen final con serverless
FROM node:18

WORKDIR /app

# Instalar serverless y serverless-http
RUN yarn global add serverless
RUN yarn add express serverless-http

# Copiar archivos construidos desde la fase anterior
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Copiar archivo server.js para manejar la aplicación
COPY server.js .

EXPOSE 3000

CMD ["serverless", "offline"]