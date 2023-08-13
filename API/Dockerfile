
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

COPY *.csproj .
RUN dotnet restore

COPY . .
CMD ["dotnet", "run"]