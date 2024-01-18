FROM python:3.11-slim-buster

# Prevents Python from buffering stdout and stderr (equivalent to python -u option)
ENV PYTHONUNBUFFERED=1

# Prevents Python from writing pyc files to disc (equivalent to python -B option)
ENV PYTHONDONTWRITEBYTECODE=1

# Set the working directory to /app
WORKDIR /app

RUN pip install --no-cache-dir --upgrade pip; pip install --no-cache-dir poetry

COPY pyproject.toml poetry.lock ./

RUN poetry config virtualenvs.create false; poetry install --no-dev

COPY src .

ENTRYPOINT ["bash", "entrypoint.sh"]
