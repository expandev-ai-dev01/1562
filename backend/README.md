# HORTifruti Backend API

Backend API for HORTifruti application - A page for displaying products, promotions, and establishment information.

## Features

- Product catalog display
- Promotions highlighting
- Establishment information
- Category filtering

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MS SQL Server
- **Architecture**: REST API

## Project Structure

```
src/
├── api/                    # API controllers
├── routes/                 # Route definitions
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── constants/              # Application constants
├── instances/              # Service instances
└── server.ts              # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MS SQL Server
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and configure your environment variables:
   ```bash
   cp .env.example .env
   ```

4. Configure database connection in `.env` file

### Development

Run the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Build

Build for production:
```bash
npm run build
```

### Production

Start production server:
```bash
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### API Routes
- Base URL: `/api/v1`
- External routes: `/api/v1/external/*` (public access)
- Internal routes: `/api/v1/internal/*` (authenticated access)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|----------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 3000 |
| DB_SERVER | Database server | localhost |
| DB_PORT | Database port | 1433 |
| DB_USER | Database user | sa |
| DB_PASSWORD | Database password | - |
| DB_NAME | Database name | hortifruti |
| DB_ENCRYPT | Enable encryption | true |
| CORS_ORIGINS | Allowed CORS origins | - |

## Development Guidelines

- Follow TypeScript strict mode
- Use path aliases (@/) for imports
- Implement proper error handling
- Document all API endpoints
- Write unit tests for business logic
- Follow REST API best practices

## License

ISC
