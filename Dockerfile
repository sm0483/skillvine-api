# common build stage

FROM node:17-alpine as common-build

ARG RAILWAY_ENVIRONMENT
ENV RAILWAY_ENVIRONMENT=$RAILWAY_ENVIRONMENT

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build


# development stage

FROM common-build as development-build

ENV NODE_ENV development


EXPOSE 5000

CMD [ "npm", "run", "dev" ]


# production stage

FROM node:17-alpine as production-build

ENV NODE_ENV production



WORKDIR /app

COPY --from=common-build /app/package*.json ./


RUN npm install --omit=dev
COPY --from=common-build /app/dist ./dist/

RUN chown -R node:node /app/dist/api/uploads


USER node

EXPOSE 5000

CMD [ "npm", "start" ]
