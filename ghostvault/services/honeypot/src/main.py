from fastapi import FastAPI
from src.routes import router

app = FastAPI(title="GhostVault Honeypot")

app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    # Roda na porta 8000 dentro do container
    uvicorn.run(app, host="0.0.0.0", port=8000)