# Plataforma de Eventos e Inscripciones

## Descripción

Este proyecto consiste en una API REST desarrollada con Node.js y Express para gestionar una plataforma de eventos e inscripciones.

El proyecto está organizado siguiendo una arquitectura por capas, preparada para futuras funcionalidades como autenticación, gestión de eventos, inscripciones, roles y control de usuarios.

En esta segunda entrega se implementa el registro seguro de usuarios, incluyendo validación de datos, normalización del email, prevención de usuarios duplicados, hash de contraseñas mediante bcrypt y persistencia de usuarios en MongoDB utilizando Mongoose.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- dotenv
- Nodemon
- JavaScript (ES Modules)

## Arquitectura

El proyecto está organizado siguiendo una arquitectura por capas para separar responsabilidades y facilitar el mantenimiento y la escalabilidad de la aplicación.

- **Routes:** definen los endpoints de la API.
- **Controllers:** reciben las peticiones HTTP y envían las respuestas.
- **Services:** contienen la lógica de negocio y las validaciones.
- **Repositories:** actúan como intermediarios entre los servicios y el acceso a datos.
- **DAO (Data Access Object):** encapsulan el acceso a la base de datos mediante los modelos.
- **Models:** representan las entidades principales del sistema utilizando Mongoose.
- **Config:** centraliza la configuración de la aplicación y las variables de entorno.
- **Middlewares:** contienen funciones intermedias utilizadas por la aplicación, incluyendo el manejo de errores.
- **Utils:** contiene funciones auxiliares reutilizables, como el hash y la comparación de contraseñas.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/NicolasSoraiz/Pre-Entrega-1-Backend-II.git
```

Ingresar al proyecto:

```bash
cd Pre-Entrega-1-Backend-II
```

Instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
NODE_ENV=development
MONGO_URL=mongodb://localhost:27017/proyectos-eventos
JWT_SECRET=tu_clave_secreta_de_ejemplo
```

El archivo `.env` contiene información de configuración local y no debe subirse al repositorio.

El archivo `.env.example` se incluye como referencia para configurar el entorno de desarrollo.

## Ejecutar el servidor

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

El servidor estará disponible en:

```text
http://localhost:3000
```

## Estructura del proyecto

```text
proyectos-eventos/
│
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── env.config.js
│   │
│   ├── controllers/
│   │   ├── events.controller.js
│   │   └── sessions.controller.js
│   │
│   ├── dao/
│   │   ├── events.dao.js
│   │   ├── sessions.dao.js
│   │   └── users.dao.js
│   │
│   ├── middlewares/
│   │   └── error.middleware.js
│   │
│   ├── models/
│   │   ├── Event.js
│   │   └── User.js
│   │
│   ├── repositories/
│   │   ├── events.repository.js
│   │   ├── sessions.repository.js
│   │   └── users.repository.js
│   │
│   ├── routes/
│   │   ├── events.router.js
│   │   └── sessions.router.js
│   │
│   ├── services/
│   │   ├── events.service.js
│   │   └── sessions.service.js
│   │
│   ├── utils/
│   │   └── hash.js
│   │
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

**GET** `/api/health`

Devuelve una respuesta indicando que el servidor está activo.

Respuesta:

```json
{
  "status": "ok",
  "message": "Servidor activo"
}
```

### Events

**GET** `/api/events`

Devuelve la lista de eventos.

En esta etapa inicial la respuesta devuelve una lista vacía.

Respuesta:

```json
{
  "status": "success",
  "payload": []
}
```

### Sessions

**GET** `/api/sessions`

Ruta inicial de sessions.

Respuesta:

```json
{
  "status": "success",
  "payload": []
}
```

## Registro de usuarios

### POST /api/sessions/register

Permite registrar un nuevo usuario en la plataforma.

El registro realiza las siguientes operaciones:

- Valida los campos obligatorios.
- Valida el formato del email.
- Valida la longitud mínima de la contraseña.
- Normaliza el email eliminando espacios y convirtiéndolo a minúsculas.
- Comprueba que el email no esté registrado previamente.
- Hashea la contraseña utilizando bcrypt.
- Guarda el usuario en MongoDB mediante Mongoose.
- Asigna el rol `user` por defecto.
- No permite manipular el rol desde el registro público.
- No devuelve la contraseña en la respuesta.

### Body esperado

```json
{
  "first_name": "Ana",
  "last_name": "Pérez",
  "email": "Ana@Mail.com ",
  "password": "Secreta123"
}
```

### Campos

- `first_name`: nombre del usuario. Es obligatorio.
- `last_name`: apellido del usuario. Es obligatorio.
- `email`: email válido. Es obligatorio. Se normaliza eliminando espacios y convirtiéndolo a minúsculas.
- `password`: contraseña de al menos 6 caracteres. Es obligatoria.
- `role`: no debe enviarse desde el registro público. El sistema asigna automáticamente el rol `user`.

### Respuesta exitosa

HTTP `201 Created`

```json
{
  "status": "success",
  "payload": {
    "id": "665f2a...",
    "first_name": "Ana",
    "last_name": "Pérez",
    "email": "ana@mail.com",
    "role": "user"
  }
}
```

La contraseña no se incluye en la respuesta.

### Campos faltantes

HTTP `400 Bad Request`

```json
{
  "status": "error",
  "message": "Faltan campos obligatorios"
}
```

### Email inválido

HTTP `400 Bad Request`

```json
{
  "status": "error",
  "message": "El formato del email no es válido"
}
```

### Contraseña demasiado corta

HTTP `400 Bad Request`

```json
{
  "status": "error",
  "message": "La contraseña debe tener al menos 6 caracteres"
}
```

### Email ya registrado

HTTP `409 Conflict`

```json
{
  "status": "error",
  "message": "El email ya está registrado"
}
```

## Seguridad

Las contraseñas de los usuarios no se almacenan en texto plano.

Antes de guardar un usuario en MongoDB, la contraseña es procesada mediante bcrypt y se almacena únicamente su hash.

Además, la contraseña, tanto en texto plano como hasheada, no se incluye en la respuesta del endpoint de registro.

El rol tampoco puede ser manipulado desde el registro público. Todos los usuarios registrados mediante este endpoint reciben inicialmente el rol `user`.

## Pruebas realizadas

Antes de la entrega se verificaron los siguientes casos:

- Registro exitoso.
- Campos obligatorios faltantes.
- Email con formato inválido.
- Contraseña con longitud insuficiente.
- Registro con email ya existente.
- Normalización del email.
- Contraseña almacenada mediante hash bcrypt en MongoDB.
- Respuesta del endpoint sin el campo `password`.
- Intento de manipulación del rol mediante el body del registro.

