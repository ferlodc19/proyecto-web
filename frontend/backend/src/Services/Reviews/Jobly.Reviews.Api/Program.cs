var builder = WebApplication.CreateBuilder(args);

// TODO: DbContext (EF Core + Npgsql), autenticación JWT y RabbitMQ.

var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new { service = "Reviews", status = "ok" }));

var api = app.MapGroup("/api/reviews");
api.MapGet("/ping", () => Results.Ok(new { service = "Reviews", message = "pong" }));

app.Run();
