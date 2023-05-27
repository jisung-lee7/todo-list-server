## Todo Server

### Prerequisite

- Install [Docker](https://www.docker.com/)

### How to run the server

```bash
docker compose up --build
```

### API urls

Express server is running on port `8080`

#### schema
```typescript
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}
```

#### endpoints

1. `GET /api/todos` - Get all todos
2. `POST /api/todos` - Add todo (payload: title, description)
3. `PUT /api/todos/:todoId` - Update todo (payload: title, description, archived, completed)
4. `DELETE /api/todos/:todoId` - Delete todo
