<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  
# Kombat JRPG Service


## Descripción

Servicio para analizar el combate de dos personajes que se enfrentan a muerte. Cada personaje cuenta con movimientos y 2 golpes especiales que infringen daño a su oponente.

El servicio se ha construido con el framework de NestJS + Typescript y dispone de una API REST que recibe la información de los personajes en formato JSON y genera una salida con  el resultado de la batalla indicando el ganado.

## Requisitos previos

Debes constar con una version de Docker disponible en el equipo para poder ejecutar el servicio a través de [Docker Compose](https://docs.docker.com/compose/install/).

Por defecto, el servicio desplegara en el puerto `3000`, sin embargo, esto puedes modificarlo asignando un nuevo valor en la variable de entorno `PORT`.

## Instalación con Docker

Debe ubicarse en la raíz del proyecto y ejecutar el siguiente comando.
```bash
$ docker-compose up
```

## Documentación del servicio

Si deseas ver la documentación del servicio, puedes acceder a la siguiente url.

```bash
$ http://localhost:3000/api/v1/documentation
```

## Información de Referencia
Se establece el prefijo /api/v1 identificar la versión del servicio sobre el dominio del servicio.

La url para ejecutar el servicio:

```bash
$ POST - http://localhost:3000/api/v1/battlefield
```

A continuación, agrego un ejemplo de request.
```bash
{
  "player1": {
      "movimientos":["SDD", "DSD", "SA", "DSD"],
      "golpes":["K", "P", "K", "P"]
  },
  "player2": {
      "movimientos":["DSD", "WSAW", "ASA", "", "ASA", "SA"],
      "golpes":["P", "K", "K", "K", "P","k"]
  }
}
```

Y una muestra de la respuesta del servicio.
```bash
{
  "summary": [
      "Tonyn se mueve y lanza una patada",
      "Arnaldor usa un Taladoken",
      "Tonyn usa un Taladoken",
      "Arnaldor se mueve y lanza una patada",
      "Tonyn conecta un Remuyuken",
      "Tonyn ha ganado la pelea y aun le queda 2 de energia"
  ]
}
```

## Ejecución manual del servicio


### Instalación de dependencias

```bash
$ npm install
```

### Ejecutar aplicación

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Ejecución de pruebas

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Contacto

- Autor - [Roberth Borges](https://www.linkedin.com/in/roberthebt/)


