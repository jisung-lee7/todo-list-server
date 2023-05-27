## Todo Server

### Prerequisite

- Install [Docker](https://www.docker.com/)

### How to run the server

```bash
docker compose up --build
```

### API urls

Express(REST API) server  is running on port `8080`

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

**Example**
```typescript
fetch(`http://localhost:8080/api/todos/496`, {
  method: 'GET'
})
  .then((response) => response.json())
  .then((result) => {
    // result is { success: boolean, data: an array of todo item }
    console.log('result', result)
  })
```

2. `POST /api/todos` - Add todo (payload: title)

**Example**
```typescript
fetch(`http://localhost:8080/api/todos/496`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ title: 'hello' })
})
  .then((response) => response.json())
  .then((result) => {
    // result is { success: boolean, data: created todo item }
    console.log('result', result)
  })
```

3. `PUT /api/todos/:todoId` - Update todo (payload: title, archived, completed)

**Example**
```typescript
fetch(`http://localhost:8080/api/todos/496`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ archived: false })
})
  .then((response) => response.json())
  .then((result) => {
    // result is { success: boolean, data: updated todo item }
    console.log('result', result)
  })
```

4. `DELETE /api/todos/:todoId` - Delete todo

**Example**
```typescript
fetch(`http://localhost:8080/api/todos/496`, {
  method: 'DELETE'
})
  .then((response) => response.json())
  .then((result) => {
    // result is { success: boolean, data: deleted todo item }
    console.log('result', result)
  })
```
