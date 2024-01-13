FROM python:3.11-slim-buster

# Set the working directory to /app
WORKDIR /app

RUN pip install --upgrade pip; pip install poetry

COPY pyproject.toml poetry.lock ./

RUN poetry config virtualenvs.create false; poetry install --no-dev

COPY ptm .

ENTRYPOINT ["bash", "start.sh"]
