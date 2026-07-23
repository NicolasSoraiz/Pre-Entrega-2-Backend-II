# Plataforma de Eventos e Inscripciones

## Descripción

Este proyecto consiste en una API REST desarrollada con Node.js y Express para gestionar una plataforma de eventos e inscripciones.

El proyecto está organizado siguiendo una arquitectura por capas, preparada para futuras funcionalidades como gestión de eventos, inscripciones, roles y control de usuarios.

En esta tercera entrega se implementa la autenticación de usuarios mediante JWT y cookies HTTP Only. Se incluye el registro seguro de usuarios, login, generación y validación de tokens JWT, ruta protegida para consultar el usuario autenticado y logout.

Las contraseñas se almacenan de forma segura mediante bcrypt y los tokens JWT se almacenan en una cookie HTTP Only llamada `currentUser`.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken
- cookie-parser
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
- **Middlewares:** contienen funciones intermedias utilizadas por la aplicación, incluyendo la autenticación mediante JWT y el manejo de errores.
- **Utils:** contiene funciones auxiliares reutilizables, como el hash y la comparación de contraseñas y la generación y validación de tokens JWT.

## Instalación

Clonar el repositorio:

```bash
git clone 
```

Ingresar al proyecto:

```bash
cd Pre-Entrega-3-Backend-II
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
JWT_EXPIRES_IN=1h
```

- `PORT`: puerto en el que se ejecuta el servidor.
- `NODE_ENV`: entorno de ejecución de la aplicación.
- `MONGO_URL`: cadena de conexión a MongoDB.
- `JWT_SECRET`: clave secreta utilizada para firmar y verificar los tokens JWT.
- `JWT_EXPIRES_IN`: tiempo de expiración del token JWT.

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
│   │   ├── auth.middleware.js
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
│   │   ├── hash.js
│   │   └── jwt.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

# Rutas disponibles

## Health

### GET `/api/health`

Devuelve una respuesta indicando que el servidor está activo.

### Respuesta

```json
{
  "status": "ok",
  "message": "Servidor activo"
}
```

---

## Events

### GET `/api/events`

Devuelve la lista de eventos.

En esta etapa inicial la respuesta devuelve una lista vacía.

### Respuesta

```json
{
  "status": "success",
  "payload": []
}
```

---

# Autenticación y sesiones

## Registro de usuarios

### POST `/api/sessions/register`

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

### Request

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

---

## Login

### POST `/api/sessions/login`

Permite autenticar a un usuario registrado.

El login:

- Valida la presencia de email y contraseña.
- Busca el usuario por email.
- Compara la contraseña utilizando bcrypt.
- Genera un token JWT con los datos `id`, `email` y `role`.
- Utiliza `JWT_SECRET` para firmar el token.
- Utiliza `JWT_EXPIRES_IN` para configurar la expiración del token.
- Guarda el JWT en una cookie llamada `currentUser`.
- La cookie utiliza `httpOnly: true`.
- La cookie utiliza `sameSite: "lax"`.
- La cookie tiene una duración de una hora (`maxAge: 3600000`).
- `secure` se establece en `true` únicamente en producción.
- No devuelve el token JWT en el cuerpo de la respuesta.

### Request

```json
{
  "email": "ana@mail.com",
  "password": "Secreta123"
}
```

### Respuesta exitosa

HTTP `200 OK`

```json
{
  "status": "success",
  "message": "Login correcto"
}
```

Además de la respuesta, el servidor establece la cookie HTTP Only:

```text
currentUser
```

### Credenciales inválidas

HTTP `401 Unauthorized`

```json
{
  "status": "error",
  "message": "Credenciales inválidas"
}
```

El mismo mensaje se utiliza cuando el email no existe o cuando la contraseña es incorrecta, evitando revelar información sobre qué dato falló.

---

## Usuario autenticado

### GET `/api/sessions/current`

Ruta protegida que devuelve la información básica del usuario autenticado.

El endpoint utiliza el middleware de autenticación para:

1. Leer la cookie `currentUser`.
2. Obtener el token JWT.
3. Verificar la firma y expiración del token.
4. Guardar el payload del JWT en `req.user`.
5. Permitir el acceso al controller.

### Request

La petición debe realizarse manteniendo la cookie `currentUser` obtenida durante el login.

```text
GET http://localhost:3000/api/sessions/current
```

### Respuesta exitosa

HTTP `200 OK`

```json
{
  "status": "success",
  "payload": {
    "id": "665f2a...",
    "email": "ana@mail.com",
    "role": "user"
  }
}
```

La respuesta no incluye la contraseña.

### Sin autenticación

HTTP `401 Unauthorized`

```json
{
  "status": "error",
  "message": "No autenticado"
}
```

Esta respuesta se devuelve cuando:

- No existe la cookie `currentUser`.
- El token es inválido.
- El token fue manipulado.
- El token está expirado.

---

## Logout

### POST `/api/sessions/logout`

Cierra la sesión del usuario eliminando la cookie de autenticación `currentUser`.

### Request

```text
POST http://localhost:3000/api/sessions/logout
```

### Respuesta

HTTP `200 OK`

```json
{
  "status": "success",
  "message": "Sesión cerrada"
}
```

Después de cerrar sesión, una nueva petición a `/api/sessions/current` sin una cookie válida devuelve `401 Unauthorized`.

---

# Seguridad

Las contraseñas de los usuarios no se almacenan en texto plano.

Antes de guardar un usuario en MongoDB, la contraseña es procesada mediante bcrypt y se almacena únicamente su hash.

Además:

- La contraseña no se incluye en las respuestas.
- La contraseña no se incluye en el payload del JWT.
- El JWT contiene únicamente `id`, `email` y `role`.
- El JWT se almacena en una cookie HTTP Only.
- El `JWT_SECRET` se obtiene mediante variables de entorno.
- La expiración del JWT se configura mediante `JWT_EXPIRES_IN`.
- El rol no puede ser manipulado desde el registro público.
- Todos los usuarios registrados mediante el endpoint público reciben inicialmente el rol `user`.
- Los errores de login utilizan un mensaje genérico para no revelar si el email existe o si la contraseña es incorrecta.

# Flujo de autenticación

El flujo principal de autenticación es:

```text
Registro
    ↓
POST /api/sessions/register
    ↓
Contraseña hasheada con bcrypt
    ↓
Usuario guardado en MongoDB
    ↓
Login
    ↓
POST /api/sessions/login
    ↓
Validación de credenciales
    ↓
Generación de JWT
    ↓
Cookie currentUser
    ↓
GET /api/sessions/current
    ↓
Middleware auth
    ↓
Verificación del JWT
    ↓
Usuario autenticado
    ↓
POST /api/sessions/logout
    ↓
Eliminación de cookie
```

# Pruebas realizadas

Antes de la entrega se verificaron los siguientes casos:

- Registro exitoso.
- Campos obligatorios faltantes.
- Email con formato inválido.
- Contraseña con longitud insuficiente.
- Registro con email ya existente.
- Normalización del email.
- Contraseña almacenada mediante hash bcrypt en MongoDB.
- Respuesta del endpoint de registro sin el campo `password`.
- Intento de manipulación del rol mediante el body del registro.
- Login exitoso.
- Cookie `currentUser` generada correctamente.
- Login con email inexistente.
- Login con contraseña incorrecta.
- Mensaje genérico de credenciales inválidas.
- Acceso exitoso a `/api/sessions/current` con cookie válida.
- Acceso a `/api/sessions/current` sin cookie.
- Validación de token JWT.
- Logout y eliminación de la cookie.
- Acceso a `/api/sessions/current` después del logout.
- Confirmación de que el password no se incluye en el JWT ni en las respuestas.