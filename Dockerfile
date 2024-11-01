# Используем Node.js для сборки React-приложения
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Сборка приложения
RUN npm run build

# Настраиваем сервер для статических файлов
FROM nginx:alpine

# Копируем сгенерированные статические файлы из предыдущего этапа в директорию, обслуживаемую Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Порт, который будет использоваться
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
