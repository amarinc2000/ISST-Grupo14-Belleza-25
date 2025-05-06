# Sistema de Reservas para Negocios de Belleza (ISST-Grupo14-Belleza-25)
![Logo UPM](./frontend/src/assets/LOGO_ESCUELA.png)
## Introducción

El **Sistema de Reservas para Negocios de Belleza** tiene como objetivo resolver los problemas asociados con la gestión manual de citas en peluquerías, centros de estética y otros establecimientos relacionados. Actualmente, estos negocios dependen de métodos tradicionales, como llamadas telefónicas, que resultan ser tediosos, propensos a errores y poco eficientes. Este sistema digitalizará el proceso, permitiendo a los negocios gestionar sus servicios y horarios de manera más eficiente, mientras que los clientes podrán realizar reservas de manera sencilla y en tiempo real.

## Características Principales

### 1. **Registro de Usuarios**
Los negocios y clientes podrán registrarse en la plataforma mediante un **nombre de usuario** y **contraseña**. Esto garantizará un acceso seguro y personalizado a las cuentas de ambos tipos de usuarios.

### 2. **Gestión de Horarios**
Los negocios podrán configurar su disponibilidad con franjas horarias específicas que estarán **disponibles, asignadas o bloqueadas**. Esto les permitirá gestionar su agenda de manera flexible y organizada.

### 3. **Exploración de Servicios**
Los clientes podrán explorar una lista detallada de servicios ofrecidos por cada negocio, incluyendo información relevante como el **precio** y la **duración** de cada servicio, facilitando así la toma de decisiones.

### 4. **Reservas en Línea**
Los clientes podrán **agendar citas** de forma rápida y sencilla, seleccionando los servicios y horarios disponibles. Este proceso se realizará en tiempo real, asegurando que la disponibilidad esté actualizada.

### 5. **Modificación y Cancelación**
Los clientes podrán modificar o cancelar sus citas con antelación, siguiendo la **política de cancelación** de cada negocio. Esto les dará flexibilidad y control sobre sus reservas.

### 6. **Notificaciones y Recordatorios**
El sistema enviará **alertas automáticas** a los clientes para recordarles sobre sus citas próximas, reduciendo las ausencias y mejorando la puntualidad.

### 7. **Valoración de Servicios**
Los clientes podrán calificar los servicios recibidos y dejar **comentarios**. Esto proporcionará **feedback valioso** tanto para los negocios como para otros usuarios que puedan considerar esos servicios.

### 8. **Promociones y Descuentos**
Los negocios podrán crear **ofertas especiales** y descuentos para promover ciertos servicios durante horarios de baja demanda, incentivando las reservas y aumentando la ocupación.

## Stakeholders y Actores del Sistema

### 1. **Usuarios Finales (Clientes)**
Los clientes son los usuarios que desean reservar servicios de belleza de manera rápida y cómoda. Necesitan una plataforma accesible y funcional que les permita gestionar sus citas con facilidad.

### 2. **Negocios de Belleza**
Los negocios de belleza, como peluquerías y centros de estética, buscan digitalizar la gestión de sus reservas. Necesitan una herramienta que les permita organizar horarios, optimizar la ocupación y fidelizar a sus clientes.

## Beneficios del Sistema

- **Eficiencia operativa**: Los negocios podrán gestionar sus reservas sin las complicaciones de los métodos tradicionales.
- **Mejora de la experiencia del cliente**: Los clientes disfrutarán de un proceso de reserva fácil, flexible y sin errores.
- **Aumento de la ocupación**: Los negocios podrán llenar sus horarios en tiempos de baja demanda mediante promociones y descuentos.
- **Feedback constante**: La valoración de servicios proporcionará información valiosa para mejorar la calidad de los servicios ofrecidos.

## Tecnologías Utilizadas

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Spring Boot (Java)
- **Base de datos**: MySQL o PostgreSQL
- **Autenticación**: JWT (JSON Web Tokens)
- **Notificaciones**: Firebase Cloud Messaging

## Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/amarinc2000/ISST-Grupo14-Belleza-25
    ```

2. **Backend**:
    - Dirígete a la carpeta del backend:
    ```bash
    cd grupo14-belleza
    ```
    - Compila y ejecuta la aplicación con:
    ```bash
    ./mvnw spring-boot:run
    ```

3. **Frontend**:
    - Dirígete a la carpeta del frontend:
    ```bash
    cd frontend
    ```
    - Instala las dependencias:
    ```bash
    npm install
    ```
    - Ejecuta la aplicación:
    ```bash
    npm run dev
    ```

## Contribuciones
