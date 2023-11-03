# syntax=docker/dockerfile:1.0

FROM node:lts-slim AS Builder
WORKDIR /home/node
USER node
COPY package* .
COPY src src/
RUN ["sh", "-c", "npm ci && npm run docker-package"]
HEALTHCHECK CMD [ "./scores" ]

FROM alpine:3.18.4
WORKDIR /usr/bin
COPY --from=Builder /home/node/scores .
HEALTHCHECK CMD [ "./scores" ]
ENTRYPOINT ["./scores"]