import React, { useState, useEffect, useMemo, useRef } from 'react'
import Login from './components/Login'
import OrderManager from './components/OrderManager'
import { initFirebase } from './firebase/init'
import './styles/index.css'

// Initialize firebase (reads config from environment via import)
initFirebase()

export default function App() {
  const [user, setUser] = useState(null)
  const [showOrderManager, setShowOrderManager] = useState(false)

  useEffect(() => {
    // placeholder for auth state subscription
  }, [])

  return (
    <div className="min-h-screen">
      {!user ? (
        <Login onLogin={(u) => setUser(u)} />
      ) : (
        <div className="p-6">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">MAES26 - Control y Planeación</h1>
            <div className="flex gap-2">
              <button className="px-3 py-2 bg-slate-700 rounded" onClick={() => setShowOrderManager(true)}>Gestión Pedidos</button>
              <button className="px-3 py-2 bg-red-600 rounded" onClick={() => setUser(null)}>Salir</button>
            </div>
          </header>

          <main>
            <p className="text-slate-300">Vista principal. Aquí van los componentes: calendario, tablero de máquinas y gráficas.</p>
          </main>

          {showOrderManager && <OrderManager onClose={() => setShowOrderManager(false)} />}
        </div>
      )}
    </div>
  )
}
