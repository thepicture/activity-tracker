# Paranoid

A real-time activity tracker with analytics

## Install

### Development

```bash
chmod +x deploy
```

```bash
bash deploy npmi
```

```bash
docker compose -f docker-compose.dev.yml up
```

### Production

```
docker build -t frontend -f docker/frontend.Dockerfile  ./services/frontend
```

```bash
chmod +x deploy
```

```bash
bash deploy npmi
```

```bash
docker compose -f docker-compose.prod.yml up
```

## Run

```bash
google-chrome http://127.0.0.1:8080
```
