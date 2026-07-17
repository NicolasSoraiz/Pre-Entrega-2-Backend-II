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

## Arquitectura

El proyecto está organizado siguiendo una arquitectura por capas para separar responsabilidades y facilitar el mantenimiento y la escalabilidad de la aplicación.

- **Routes:** definen los endpoints de la API.
- **Controllers:** reciben las peticiones HTTP y envían las respuestas.
- **Services:** contienen la lógica de negocio.
- **Repositories:** actúan como intermediarios entre los servicios y el acceso a datos.
- **DAO (Data Access Object):** encapsulan el acceso a la fuente de datos.
- **Models:** representan las entidades principales del sistema.
- **Config:** centraliza la configuración de la aplicación.

## Instalación

Clonar el repositorio:

```bash
git https://github.com/NicolasSoraiz/Pre-Entrega-1-Backend-II.git
```

Ingresar al proyecto:

```bash
cd Pre-Entrega-1-Backend-II
```

Instalar dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` con las siguientes variables:

```env
PORT=3000
NODE_ENV=development
MONGO_URL=mongodb://localhost:27017/proyectos-eventos
JWT_SECRET=secret123
```

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
proyectos-eventos/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── dao/
│   ├── middlewares/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
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
  "payload": []
}
```