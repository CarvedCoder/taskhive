import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import Response
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware
from contextlib import asynccontextmanager

from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

from secure import Secure 
from app.core.config import settings
from app.core.logging import logger
from app.db.supabase_client import init_supabase_client
from app.api.routers import todos, study, marketplace, events, storage, admin
from app.security_headers import add_security_headers_middleware


# Rate limiter (example)
limiter = Limiter(key_func=get_remote_address, default_limits=[f"{settings.RATE_LIMIT_REQUESTS_PER_MINUTE}/minute"])

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing Supabase client...")
    await init_supabase_client()
    yield   # ← this hands control back to FastAPI to run the application
    logger.info("Shutting down...")

app = FastAPI(
    title="Taskhive Backend",
    version="0.2.0",
    lifespan=lifespan,
)

app.middleware("http")(add_security_headers_middleware)

# Optional: enforce HTTPS in production (only enable when you actually run under HTTPS)
# app.add_middleware(HTTPSRedirectMiddleware)

# CORS — lock this down in production to your frontend origin(s)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","https://taskhive.shop",
                   "https://www.taskhive.shop"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

secure_headers = (
    Secure()
    
)

app.include_router(todos.router)
app.include_router(study.router)
app.include_router(marketplace.router)
app.include_router(events.router)
app.include_router(storage.router)
app.include_router(admin.router)



@app.get("/")
async def root():
    return {"status": "ok"}





if __name__ == "__main__":
    uvicorn.run("app.main:app", host=settings.APP_HOST, port=settings.APP_PORT, reload=True)
