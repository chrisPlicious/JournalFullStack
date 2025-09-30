using JournalAPI.Data;
using JournalAPI.Repositories;
using JournalAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
var env = builder.Environment.EnvironmentName;

// ------------------- DATABASES -------------------

// JournalDbContext (your journal entries)
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

// ApplicationDbContext (Identity)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var identityConn = builder.Configuration.GetConnectionString("IdentityConnection")
                       ?? builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseSqlServer(identityConn); // or UseMySql if needed
});

// ------------------- IDENTITY -------------------
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    // Password settings
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;

    // Lockout settings
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// ------------------- JWT AUTHENTICATION -------------------
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddAuthorization();

// ------------------- REPOSITORIES & SERVICES -------------------
builder.Services.AddScoped<IJournalRepository, JournalRepository>();
builder.Services.AddScoped<IJournalService, JournalService>();

// ------------------- CONTROLLERS & JSON -------------------
builder.Services.AddControllers()
    .AddJsonOptions(opts =>
    {
        opts.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });

// ------------------- SWAGGER -------------------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Auth Header using the Bearer Scheme. Example: \"Authorization: Bear {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// ------------------- CORS -------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

// ------------------- MIGRATIONS & SEEDING -------------------
using (var scope = app.Services.CreateScope())
{
    var journalDb = scope.ServiceProvider.GetRequiredService<JournalDbContext>();
    journalDb.Database.Migrate();

    var identityDb = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    identityDb.Database.Migrate();

    // Optional: Seed default roles/admin user
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();

    if (!await roleManager.RoleExistsAsync("Admin"))
        await roleManager.CreateAsync(new IdentityRole("Admin"));

    if (await userManager.FindByNameAsync("admin") == null)
    {
        var adminUser = new IdentityUser { UserName = "admin", Email = "admin@example.com", EmailConfirmed = true };
        await userManager.CreateAsync(adminUser, "Admin@123"); // strong password
        await userManager.AddToRoleAsync(adminUser, "Admin");
    }
}

// ------------------- MIDDLEWARE -------------------
app.UseSwagger();
app.UseSwaggerUI(); // Dev: no authorization needed

app.UseHttpsRedirection();
app.UseCors("DevCors");

app.UseAuthentication(); // <--- REQUIRED for Identity
app.UseAuthorization();

app.MapControllers();

app.Run();
