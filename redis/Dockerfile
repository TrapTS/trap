FROM docker.io/redis:4-alpine

ENV REDIS_PASSWORD alfieri

CMD ["sh", "-c", "exec redis-server --requirepass \"$REDIS_PASSWORD\""]