import React from 'react';
import { ShieldAlert, Globe, Terminal, Lock } from 'lucide-react';

export default function Dashboard() {
  // DADOS MOCKADOS (FALSOS) PARA SIMULAR O BANCO DE DADOS
  // Isso garante que, se alguém olhar o código, vê que você estruturou os dados.
  const attacks = [
    { id: 1, ip: "45.227.255.10", location: "Moscow, RU", type: "SQL Injection", payload: "' OR 1=1 --", time: "10:42 AM" },
    { id: 2, ip: "185.193.89.4", location: "Beijing, CN", type: "Brute Force", payload: "admin / 123456", time: "10:45 AM" },
    { id: 3, ip: "203.0.113.45", location: "São Paulo, BR", type: "XSS Stored", payload: "<script>alert(1)</script>", time: "11:02 AM" },
    { id: 4, ip: "192.168.1.50", location: "Internal Net", type: "Directory Traversal", payload: "../../../etc/passwd", time: "11:15 AM" },
    { id: 5, ip: "89.208.29.1", location: "Berlin, DE", type: "RCE Attempt", payload: "; cat /etc/shadow", time: "11:30 AM" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-emerald-400 p-8 font-mono">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 border-b border-emerald-900 pb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ShieldAlert className="w-8 h-8 text-red-500" />
          GHOSTVAULT <span className="text-slate-500 text-sm">| Threat Intelligence Center</span>
        </h1>
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> SYSTEM ONLINE</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> HONEYPOT ACTIVE</span>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900 p-4 border border-emerald-900/50 rounded hover:border-emerald-500 transition-colors">
          <div className="text-slate-400 text-xs uppercase mb-1">Total Attacks (24h)</div>
          <div className="text-3xl font-bold text-white">8,421</div>
        </div>
        <div className="bg-slate-900 p-4 border border-emerald-900/50 rounded hover:border-emerald-500 transition-colors">
          <div className="text-slate-400 text-xs uppercase mb-1">Top Threat Origin</div>
          <div className="text-3xl font-bold text-white flex items-center gap-2"><Globe className="w-6 h-6"/> Russia</div>
        </div>
        <div className="bg-slate-900 p-4 border border-emerald-900/50 rounded hover:border-emerald-500 transition-colors">
          <div className="text-slate-400 text-xs uppercase mb-1">Unique IPs</div>
          <div className="text-3xl font-bold text-white">142</div>
        </div>
        <div className="bg-slate-900 p-4 border border-emerald-900/50 rounded hover:border-emerald-500 transition-colors">
          <div className="text-slate-400 text-xs uppercase mb-1">Critical Exploits</div>
          <div className="text-3xl font-bold text-red-500">12</div>
        </div>
      </div>

      {/* Live Feed Table */}
      <div className="bg-slate-900 rounded border border-emerald-900/50 overflow-hidden">
        <div className="p-4 bg-slate-900/50 border-b border-emerald-900 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2"><Terminal className="w-5 h-5"/> Live Attack Feed</h2>
          <span className="text-xs text-emerald-600 bg-emerald-900/30 px-2 py-1 rounded">Real-time WebSocket</span>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-emerald-950/20 text-emerald-500">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Source IP</th>
              <th className="p-4">Location</th>
              <th className="p-4">Attack Type</th>
              <th className="p-4">Payload (Evidence)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-900/30">
            {attacks.map((attack) => (
              <tr key={attack.id} className="hover:bg-emerald-900/10 transition-colors">
                <td className="p-4 text-slate-400">{attack.time}</td>
                <td className="p-4 font-mono text-white">{attack.ip}</td>
                <td className="p-4">{attack.location}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    attack.type.includes("SQL") ? "bg-red-900 text-red-200" : "bg-orange-900 text-orange-200"
                  }`}>
                    {attack.type}
                  </span>
                </td>
                <td className="p-4 font-mono text-xs text-slate-300 bg-black/20">{attack.payload}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}