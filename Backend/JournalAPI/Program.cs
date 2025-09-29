using JournalAPI.Data;
using JournalAPI.Repositories;
using JournalAPI.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
var env = builder.Environment.EnvironmentName;

if (env == "Docker")
{
    var dockerConn = builder.Configuration.GetConnectionString("DefaultConnection");
    builder.Services.AddDbContext<JournalDbContext>(options =>
        options.UseMySql(dockerConn, ServerVersion.AutoDetect(dockerConn)));
}
else
{
    var localConn = builder.Configuration.GetConnectionString("DefaultConnection");
    builder.Services.AddDbContext<JournalDbContext>(options =>
        options.UseSqlServer(localConn));
}

// Connect to SQL Server
// builder.Services.AddDbContext<JournalDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add repositories and services
builder.Services.AddScoped<IJournalRepository, JournalRepository>();
builder.Services.AddScoped<IJournalService, JournalService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000") // React app URL
              .AllowAnyHeader()
              .AllowAnyMethod());
});

builder.Services.AddControllers()
    .AddJsonOptions(opts =>
    {
        opts.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<JournalDbContext>();
    dbContext.Database.EnsureCreated(); // Apply migrations at startup
}

    app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
// ✅ Apply the named CORS policy BEFORE Authorization
app.UseCors("DevCors");
app.UseAuthorization();
app.MapControllers();
app.Run();
