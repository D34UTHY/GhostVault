-- Cria o banco de dados
CREATE DATABASE ghostvault_db;

-- Conecta o banco
\c ghostvault_db;

-- Tabela de Usuários 
-- Usuário conseguirá expor informações daqui
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Inseri hashes falsos
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password_hash, is_admin) VALUES 
('admin', 'sha256$8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', TRUE),
('dave.silva', 'sha256$1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', FALSE),
('backup_svc', 'sha256$abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef', TRUE);

-- Tabela de Auditoria REAL para identificar o atacante
-- Dados reais do ataque que ocorreu
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source_ip VARCHAR(45),
    geo_location VARCHAR(100), 
    attack_type VARCHAR(50), -- "SQL Injection", "XSS", "Brute Force
    payload TEXT, -- Payload que o atacante utilizou
    user_agent TEXT, -- Qual navegador utilizou (ou script)
    endpoint_hit VARCHAR(100) -- Qual rota tentou acessar
);

-- Index para deixar o Dashboard rápido
CREATE INDEX idx_audit_ip ON audit_logs(source_ip);
CREATE INDEX idx_audit_type ON audit_logs(attack_type);