export const calculateFraudRisk = (ticket, tickets, count) => {
  if (!ticket || !tickets.length || !count) {
    return null
  }

  let risk = 2

  // Even if the risk gets <2 ro > 98 during the process, I keep it as it is until the end. Otherwise calculation is dependent on the order of the conditions.

  const createdHour = new Date(ticket.createdAt).getHours()
  const avarage =
    tickets.reduce((sum, ticket) => (sum += Number(ticket.price)), 0) /
    tickets.length

  const diffPercent = Math.abs(((ticket.price - avarage) / avarage) * 100)

  if (count === 1) {
    risk += 4
  }

  if (ticket.price > avarage) {
    risk -= diffPercent > 15 ? 15 : diffPercent
  } else if (ticket.price < avarage) {
    risk += diffPercent
  }

  if (createdHour >= 9 && createdHour <= 17) {
    risk -= 13
  } else {
    risk += 13
  }

  if (ticket.comments.length > 3) {
    risk += 6
  }

  risk = Math.round(risk)

  if (risk > 2 && risk < 98) return risk
  else if (risk > 98) return 98
  return 2
}

export const generateColor = risk => {
  if (risk < 20) return '#99db97'
  else if (risk < 60) return '#d8d563'
  else return '#d85454'
}
