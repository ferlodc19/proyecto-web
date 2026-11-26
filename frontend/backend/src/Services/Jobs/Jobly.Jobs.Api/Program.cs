var builder = WebApplication.CreateBuilder(args);

// TODO: DbContext (EF Core + Npgsql), autenticación JWT y RabbitMQ.

var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new { service = "Jobs", status = "ok" }));

var api = app.MapGroup("/api/jobs");
api.MapGet("/ping", () => Results.Ok(new { service = "Jobs", message = "pong" }));

app.Run();
