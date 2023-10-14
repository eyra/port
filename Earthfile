VERSION 0.7
FROM node:18-bookworm
WORKDIR /code/
ENV CI=true

commit-hook:
    BUILD +test
    BUILD +lint

setup-base:
    COPY package.json package-lock.json ./
    RUN npm ci
    COPY --dir . ./

test:
    FROM +setup-base
    RUN npm run test

lint:
    FROM +setup-base
    RUN npm run lint

build-py:
    FROM python:3.11
    WORKDIR /py
    RUN python -m pip install poetry
    COPY --dir src/framework/processing/py /
    RUN poetry install
    RUN poetry build --format wheel
    SAVE ARTIFACT dist/

release:
    BUILD +build-py
    ARG release_tag=release
    ARG build_type=release
    FROM +setup-base
    ENV REACT_APP_BUILD=$build_type
    RUN apt-get update && apt install -y zip
    COPY +build-py/dist/* public/
    RUN npm run build:css
    RUN --no-cache npx update-browserslist-db@latest
    RUN npm run build:app
    RUN npm run archive
    SAVE ARTIFACT release.zip AS LOCAL $release_tag.zip