export function generateCalendar(start = new Date(2025,8,1), end = new Date(2026,11,31)) {
  const dates = []
  const months = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC']
  let idx = 0
  for (let d = new Date(start); d <= end; d.setDate(d.getDate()+1)) {
    const copy = new Date(d)
    dates.push({
      index: idx++,
      id: `${['DOMINGO','LUNES','MARTES','MIERCOLES','JUEVES','VIERNES','SABADO'][copy.getDay()]} ${copy.getDate()} ${months[copy.getMonth()]} ${copy.getFullYear()}`,
      shortDay: ['DOM','LUN','MAR','MIE','JUE','VIE','SAB'][copy.getDay()],
      dateNum: copy.getDate(),
      month: months[copy.getMonth()],
      monthIndex: copy.getMonth(),
      year: copy.getFullYear(),
      isoDate: copy.toISOString().split('T')[0]
    })
  }
  return dates
}

export function calculateConsumptionDetails(order, producedQty=0) {
  if (!order) return { totalNeeded:0, consumption:[], totalYarnKilos:0 }
  const materials = order.materials || []
  const waste = 1 + (Number(order.wastePercentage || 0) / 100)
  let totalYarnGramsNeeded = 0
  if (order.parts && order.parts.length>0) {
    order.parts.forEach(part => { totalYarnGramsNeeded += Number(part.qty) * Number(part.weight) })
  } else {
    totalYarnGramsNeeded = Number(order.totalQty) * Number(order.pieceWeightGrams || 0)
  }
  totalYarnGramsNeeded = totalYarnGramsNeeded * waste
  const totalYarnKilos = totalYarnGramsNeeded / 1000
  const consumption = materials.filter(m=>m.name && m.percentage).map(m=>{
    const percent = Number(m.percentage)/100
    return { name: m.name, percentage: m.percentage, kilosNeeded: totalYarnKilos*percent, kilosConsumed: 0 }
  })
  return { totalNeeded: order.totalQty, consumption, totalYarnKilos }
}
