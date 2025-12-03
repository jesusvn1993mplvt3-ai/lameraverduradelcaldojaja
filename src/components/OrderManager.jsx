import React, { useState } from 'react'
import { calculateConsumptionDetails } from '../utils/calc'

export default function OrderManager({ onClose }) {
  const [viewMode, setViewMode] = useState('list')
  const [modelName, setModelName] = useState('')
  const [isComposite, setIsComposite] = useState(false)
  const [parts, setParts] = useState([])
  const [materials, setMaterials] = useState([{name:'LYCRA', percentage:''},{name:'NYLON', percentage:''}])
  const [waste, setWaste] = useState(0)

  const addPart = ()=> setParts(p=>[...p, {name:'', qty:'', time:'', weight:''}])
  const save = () => {
    // mock save: create an order object and print to console
    const order = {
      model: modelName,
      parts: isComposite ? parts : [],
      totalQty: isComposite ? parts.reduce((a,b)=>a+Number(b.qty||0),0) : 0,
      materials,
      wastePercentage: waste,
      startDate: new Date().toISOString().split('T')[0]
    }
    console.log('Saving order', order)
    alert('Pedido simulado guardado (ver consola)')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl w-full max-w-3xl h-[90vh] overflow-auto p-4 border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Gestión de Producción</h3>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-3 py-1 bg-slate-700 rounded">Cerrar</button>
            <button onClick={save} className="px-3 py-1 bg-green-600 rounded">Guardar</button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div>
            <p className="text-slate-300">Pedidos activos (mock)</p>
            <div className="mt-4 flex gap-2">
              <button onClick={()=>{setViewMode('create'); setModelName('')}} className="bg-blue-600 px-4 py-2 rounded">Nuevo</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="text-xs text-slate-400">Modelo</label>
              <input value={modelName} onChange={e=>setModelName(e.target.value)} className="w-full p-2 bg-slate-900 rounded text-white" />
            </div>

            <div className="mb-4">
              <label className="text-xs text-slate-400 block mb-2">Tipo</label>
              <div className="flex gap-2">
                <button onClick={()=>setIsComposite(false)} className={`px-3 py-1 rounded ${!isComposite ? 'bg-blue-600' : 'bg-slate-700'}`}>Simple</button>
                <button onClick={()=>setIsComposite(true)} className={`px-3 py-1 rounded ${isComposite ? 'bg-blue-600' : 'bg-slate-700'}`}>Compuesto</button>
              </div>
            </div>

            {isComposite && (
              <div className="space-y-2 mb-4">
                <h4 className="font-bold text-white">Partes</h4>
                {parts.map((p,i)=>(
                  <div key={i} className="grid grid-cols-4 gap-2 bg-slate-900 p-2 rounded">
                    <input placeholder="Nombre" value={p.name} onChange={e=>{const n=[...parts]; n[i].name=e.target.value; setParts(n)}} className="p-1 bg-slate-800 rounded" />
                    <input placeholder="Cantidad" value={p.qty} onChange={e=>{const n=[...parts]; n[i].qty=e.target.value; setParts(n)}} className="p-1 bg-slate-800 rounded" />
                    <input placeholder="Min/Pza" value={p.time} onChange={e=>{const n=[...parts]; n[i].time=e.target.value; setParts(n)}} className="p-1 bg-slate-800 rounded" />
                    <input placeholder="Gr/Pza" value={p.weight} onChange={e=>{const n=[...parts]; n[i].weight=e.target.value; setParts(n)}} className="p-1 bg-slate-800 rounded" />
                  </div>
                ))}
                <button onClick={addPart} className="mt-2 px-3 py-1 bg-slate-700 rounded">+ Agregar Parte</button>
              </div>
            )}

            <div className="mb-4">
              <h4 className="font-bold text-white">Materiales</h4>
              {materials.map((m,i)=>(
                <div key={i} className="flex gap-2 mb-2">
                  <input value={m.name} onChange={e=>{const n=[...materials]; n[i].name=e.target.value; setMaterials(n)}} className="p-1 bg-slate-800 rounded" />
                  <input value={m.percentage} onChange={e=>{const n=[...materials]; n[i].percentage=e.target.value; setMaterials(n)}} className="p-1 bg-slate-800 rounded w-20" />
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="text-xs text-slate-400">Merma %</label>
              <input type="number" value={waste} onChange={e=>setWaste(e.target.value)} className="p-2 bg-slate-900 rounded w-32" />
            </div>

            <div className="flex gap-2">
              <button onClick={()=>setViewMode('list')} className="px-3 py-2 bg-slate-700 rounded">Atrás</button>
              <button onClick={save} className="px-3 py-2 bg-green-600 rounded">Guardar Pedido</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
