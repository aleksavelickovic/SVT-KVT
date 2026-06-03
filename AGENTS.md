# Repository Guidelines

## Project Structure & Module Organization

This repository contains two applications:

- `Frontend/events-frontend/` Angular client.
- `Backend/events/` Spring Boot backend.

Key frontend paths:

- `src/app/` application modules, pages, services, and models.
- `src/assets/` static assets if added later.
- `src/*.spec.ts` unit tests next to components/services.

Key backend paths:

- `src/main/java/rs/ac/ftn/svt/events/` controllers, services, repositories, security, and DTO/entity classes.
- `src/main/resources/` configuration and seed data such as `application.properties` and `data.sql`.
- `src/test/java/` backend tests.

## Build and Development Commands

Run commands from the relevant subproject directory.

- `cd Frontend/events-frontend && npm install` installs Angular dependencies.
- `npm start` starts the dev server.
- `npm run build` produces a production frontend build.
- `mvn package` builds the backend JAR.

## Coding Style & Naming Conventions

- Frontend formatting follows `.editorconfig`: 2-space indentation, UTF-8, trailing whitespace trimmed, final newline
  required.
- TypeScript uses single quotes; HTML templates use Angular formatting via Prettier settings in `package.json`.
- Use descriptive Angular file names such as `add-event.component.ts`, `auth-service.ts`, and keep component tests as
  `*.spec.ts`.
- Backend packages follow the existing layered structure: `controller`, `service`, `repository`, `model/dto`,
  `model/entity`, `security`, and `aspect`.

## Testing Guidelines

- Writing tests of any kind is not needed, it is a requirement to never write unit, integration, or end-to-end tests,
  ever. This is of the utmost importance.

## Commit & Pull Request Guidelines

- Commit history uses short prefixes such as `feat:` and bracketed notes like `[EDIT]`. Keep messages imperative and
  scoped.
- For pull requests, include:~~~~
    - a short summary of the change,
    - linked issue or task reference if available,
    - screenshots or screen recordings for UI changes,
    - notes on backend/API changes and any configuration updates.

## Configuration Notes

- Do not commit generated output such as `Frontend/events-frontend/node_modules/` or `Backend/events/target/`.
- Review `Backend/events/src/main/resources/application.properties` before changing local environment variables,
  database settings, or mail configuration.
