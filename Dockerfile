# syntax=docker/dockerfile:1
ARG NODE_VERSION=20

FROM gcr.io/distroless/nodejs${NODE_VERSION}-debian12

ENV NODE_ENV production


WORKDIR /usr/src/app

USER nonroot

COPY ./src/scores.mjs .

CMD ["scores.mjs"]
