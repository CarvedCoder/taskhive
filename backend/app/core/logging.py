import logging
from logging.handlers import RotatingFileHandler
import os
from app.core.config import settings

def setup_logging():
    logger = logging.getLogger("taskhive")
    logger.setLevel(logging.INFO)
    os.makedirs("logs", exist_ok=True) 
    handler = RotatingFileHandler("logs/taskhive.log", maxBytes=10_000_000, backupCount=3)
    fmt = logging.Formatter("%(asctime)s %(levelname)s %(name)s: %(message)s")
    handler.setFormatter(fmt)
    logger.addHandler(handler)
    return logger

logger = setup_logging()
