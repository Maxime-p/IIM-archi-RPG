# Installation

Clone this project with your favorite way (SSH, HTTPS, GitHub CLI, etc.)
```bash
  npm install
```
copy the `.env.example` file to `.env` and fill in the required fields in both `back` and `front` workspaces.

# Commands

- `npm run dev` - Start the development server
- `npm run dev:front` - Start the development server in the `front` workspace
- `npm run build` - Build the project
- `npm run build:front` - Build the project in the `front` workspace
- `npm run format` - Format the code with Prettier
- `npm run format:front` - Format the code in the `front` workspace
- `npm run format-check` - Check if the code is formatted correctly
- `npm run format-check:front` - Check if the code in the `front` workspace is formatted correctly


# Tech Stack

## Frontend
- React
- TypeScript

## Backend
- Node.js
- Strapi

# AI
- Ollama + Mistral
- Flask

# Structure

## Frontend
- `public/` - Static files
- `src/` - Entry point of the application
  - `src/components/` - Reusable components
  - `src/assets/` - Images, fonts, etc.


## Backend

_WIP_

## AI

_WIP_


# Endpoints usage

### GET /characters
Get all characters

### GET /characters/:id
Get a character by id

### POST /characters
Create a character

### PUT /characters/:id
Update a character by id

### DELETE /characters/:id
Delete a character by id

_WIP_