# Plataforma de Eventos e Inscripciones

## Descripción

Este proyecto consiste en una API REST desarrollada con Node.js y Express para gestionar una plataforma de eventos e inscripciones.

Esta primera entrega corresponde a la base arquitectónica del proyecto, organizada en capas y preparada para futuras funcionalidades como autenticación, gestión de eventos, inscripciones y control de usuarios.

## Tecnologías utilizadas

- Node.js
- Express
- dotenv
- Nodemon
- JavaScript (ES Modules)

## Instalación

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar al proyecto:

```bash
cd proyectos-eventos
```

Instalar dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` con las siguientes variables:

- PORT
- NODE_ENV
- MONGO_URL
- JWT_SECRET

## Ejecutar el servidor

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

## Estructura del proyecto

```text
src/
├── config/
├── controllers/
├── dao/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── services/
├── utils/
├── app.js
└── server.js
```

## Rutas disponibles

### Health

GET /api/health

Respuesta:

```json
{
  "status": "ok",
  "message": "Servidor activo"
}
```

### Events

GET /api/events

Respuesta:

```json
{
  "status": "success",
  "payload": []
}
```

### Sessions

GET /api/sessions

Respuesta:

```json
{
  "status": "success",
  "message": "Ruta de sessions disponible"
}
```