# Dockerfile (production-ready for Render)
FROM python:3.11-slim

# set a working dir
WORKDIR /app

# avoid buffering so logs appear immediately
ENV PYTHONUNBUFFERED=1
ENV PORT=8000

# install system deps needed for some python packages (add extras if needed)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# copy only requirements first for better layer caching
COPY requirements.txt /app/requirements.txt

# upgrade pip and install requirements
RUN pip install --upgrade pip \
 && pip install --no-cache-dir -r /app/requirements.txt

# copy app code
COPY ./app /app/app
COPY ./scripts /app/scripts 

# create a non-root user and chown
RUN useradd --create-home appuser \
 && chown -R appuser:appuser /app

USER appuser

# expose (informational)
EXPOSE 8000

# Use gunicorn with uvicorn workers, binding to $PORT provided by platform.
# Use sh -c so $PORT is expanded at runtime.
CMD ["sh", "-c", "gunicorn -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:${PORT} --workers 2 --threads 2 --timeout 300"]
