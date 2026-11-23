var builder = WebApplication.CreateBuilder(args);

// TODO: DbContext (EF Core + Npgsql), autenticación JWT y RabbitMQ.

var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new { service = "Companies", status = "ok" }));

var api = app.MapGroup("/api/companies");
api.MapGet("/ping", () => Results.Ok(new { service = "Companies", message = "pong" }));

app.Run();
