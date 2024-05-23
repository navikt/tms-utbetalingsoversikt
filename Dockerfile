FROM gcr.io/distroless/nodejs20-debian12
ENV NODE_ENV production

WORKDIR usr/src/app
COPY server server/
COPY dist dist/

WORKDIR server

CMD ["./server.js"]

ENV PORT=8080
EXPOSE $PORT