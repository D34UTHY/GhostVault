import re
import psycopg2
import os
from datetime import datetime

# Configuração do Banco de Dados que terá as evidencias reais do atauqe
def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST", "postgres"),
            database=os.getenv("DB_NAME", "ghostvault_db"),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASSWORD", "postgres")
        )
        return conn
    except Exception as e:
        print(f"Erro ao conectar no DB de Logs: {e}")
        return None

def analyze_threat(payload: str, ip: str, user_agent: str):
    """
    Analisa o input. Se parecer ataque, salva o log
    Se não, salva como tentativa falha normal e nao ataque
    """
    conn = get_db_connection()
    if not conn:
        return

    cursor = conn.cursor()
    
    # Padrões comuns de SQL Injection
    sqli_patterns = [
        r"(--)", r"(\/\*)", r"(\sOR\s)", r"(\sAND\s)", r"(UNION)", 
        r"(SELECT)", r"(DROP)", r"(')", r"(1=1)"
    ]
    
    attack_type = "Login Failed"
    
    # Verifica padrões de injeção
    for pattern in sqli_patterns:
        if re.search(pattern, payload, re.IGNORECASE):
            attack_type = "SQL Injection Attempt"
            break
            
    print(f"[ALERTA] {attack_type} detectado de {ip}: {payload}")

    # salva a evidência no banco
    try:
        cursor.execute("""
            INSERT INTO audit_logs (source_ip, attack_type, payload, user_agent)
            VALUES (%s, %s, %s, %s)
        """, (ip, attack_type, payload, user_agent))
        conn.commit()
    except Exception as e:
        print(f"Erro ao salvar log: {e}")
    finally:
        cursor.close()
        conn.close()

def fake_response(payload: str):
    """
    Simula resposta de erro que faz o atacante continuar tentando, sem logá-lo
    """
    if "'" in payload:
        return {
            "error": "Internal Server Error",
            "details": "PG::SyntaxError: syntax error at or near \"'\" at character 24"
        }
    
    return {"error": "Invalid credentials"}