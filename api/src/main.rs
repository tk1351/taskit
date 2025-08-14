use axum::{Router, response::Json, routing::get};

async fn hello() -> &'static str {
    "Hello world"
}

async fn get_tasks() -> Json<Vec<String>> {
    Json(Vec::new())
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(hello))
        .route("/tasks", get(get_tasks));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
