from fastapi import APIRouter, Request, Form
from src.simulation import analyze_threat, fake_response

router = APIRouter()

@router.get("/")
def read_root():
    return {"system": "CorpData Secure Vault v2.1", "status": "online"}

@router.post("/auth/login")
async def login(request: Request, username: str = Form(...), password: str = Form(...)):
    # Pega o IP real do atacante e o useragent
    client_ip = request.client.host
    user_agent = request.headers.get('user-agent', 'unknown')

    analyze_threat(username, client_ip, user_agent)
    if len(password) > 0:
         analyze_threat(password, client_ip, user_agent)
    
    # Retorna a dados falsos
    return fake_response(username)