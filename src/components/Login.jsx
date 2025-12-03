import React, { useState } from 'react'

export default function Login({ onLogin }) {
  const [pin, setPin] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // For now, accept any 4-digit pin and create a mock user
    if (!pin || pin.length < 1) { alert('Ingresa PIN'); return }
    const user = { id: pin, name: 'Usuario ' + pin, role: 'operator' }
    onLogin(user)
  }

  return (
    <div className="flex items-center justify-center h-screen p-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow w-full max-w-sm text-center border border-slate-700">
        <h2 className="text-2xl font-black text-white mb-4">MAES - TEJIDO</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="tel" value={pin} onChange={(e)=>setPin(e.target.value)} placeholder="PIN" className="w-full text-center text-4xl p-4 bg-slate-900 border-2 border-slate-700 rounded-xl tracking-[0.2em] focus:border-blue-500 outline-none font-bold text-white password-mask" />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg">INGRESAR</button>
        </form>
      </div>
    </div>
  )
}
