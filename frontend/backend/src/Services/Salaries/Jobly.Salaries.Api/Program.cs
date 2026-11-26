var builder = WebApplication.CreateBuilder(args);

// TODO: DbContext (EF Core + Npgsql), autenticación JWT y RabbitMQ.

var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new { service = "Salaries", status = "ok" }));

var api = app.MapGroup("/api/salaries");
api.MapGet("/ping", () => Results.Ok(new { service = "Salaries", message = "pong" }));

app.Run();
