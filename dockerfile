# Usa una imagen de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia el archivo package.json y tsconfig desde la ubicación adecuada
COPY package*.json ./
COPY tsconfig*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de la aplicación al directorio de trabajo
COPY . .

# Compila la aplicación
RUN npm run build

# Expón el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["npm", "start"]
