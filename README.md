## API Endpoints

### Create a Task
- **POST** `/tasks`
- **Body**: `{ "title": "Task Title", "description": "Optional description" }`

### Get All Tasks
- **GET** `/tasks`

### Get Task by ID
- **GET** `/tasks/:id`

### Update a Task
- **PUT** `/tasks/:id`
- **Body**: `{ "title": "New Title", "description": "Updated description" }`

### Delete a Task
- **DELETE** `/tasks/:id`

---

### Example Success & Error Responses

- `201 Created` – Task created successfully
- `400 Bad Request` – Missing title
- `404 Not Found` – Task not found
