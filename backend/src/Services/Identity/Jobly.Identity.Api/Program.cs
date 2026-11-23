var builder = WebApplication.CreateBuilder(args);

// TODO: DbContext (EF Core + Npgsql), autenticación JWT y RabbitMQ.

var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new { service = "Identity", status = "ok" }));

var api = app.MapGroup("/api/identity");
api.MapGet("/ping", () => Results.Ok(new { service = "Identity", message = "pong" }));

app.Run();
