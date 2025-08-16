use axum::extract::Path;

use axum::{Router, response::Json, routing::get};

async fn hello() -> &'static str {
    "Hello world"
}

#[derive(serde::Serialize, Clone)]
struct Task {
    id: i32,
    title: String,
    description: Option<String>,
    is_completed: bool,
}

async fn get_tasks() -> Json<Vec<Task>> {
    let tasks: Vec<Task> = vec![
        Task {
            id: 1,
            title: "test task".to_string(),
            description: Some("test description".to_string()),
            is_completed: false,
        },
        Task {
            id: 2,
            title: "test task2".to_string(),
            description: None,
            is_completed: false,
        },
    ];
    Json(tasks)
}

async fn get_task(path: Path<i32>) -> Json<Option<Task>> {
    let id = path.0;
    let tasks: Vec<Task> = vec![
        Task {
            id: 1,
            title: "test task".to_string(),
            description: Some("test description".to_string()),
            is_completed: false,
        },
        Task {
            id: 2,
            title: "test task2".to_string(),
            description: None,
            is_completed: false,
        },
    ];

    let task = tasks.iter().find(|task| task.id == id).cloned();

    Json(task)
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(hello))
        .route("/tasks", get(get_tasks))
        .route("/tasks/{id}", get(get_task));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
