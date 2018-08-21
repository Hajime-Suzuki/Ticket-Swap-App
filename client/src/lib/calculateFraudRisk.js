export const calculateFraudRisk = (ticket, tickets, count) => {
  let risk = 2
  // Even if the risk gets <2 ro > 98 during the process, I keep it as it is until the end. Otherwise calculation is dependent on the order of condition.

  const createdHour = new Date(ticket.createdAt).getHours()
  const avarage =
    tickets.reduce((sum, ticket) => (sum += Number(ticket.price)), 0) /
    tickets.length

  const diffPercent = Math.abs(((ticket.price - avarage) / avarage) * 100)
  console.log(ticket.price, avarage, diffPercent)

  if (count === 1) {
    console.log('only one ticket from the person')
    risk += 4
  }

  if (ticket.price > avarage) {
    console.log('expesive')
    risk -= diffPercent > 15 ? 15 : diffPercent
  } else if (ticket.price < avarage) {
    console.log('cheape')
    risk += diffPercent
  }

  if (createdHour >= 9 && createdHour <= 17) {
    console.log('businnes hour')
    risk -= 13
  } else {
    console.log('not businnes hour')

    risk += 13
  }

  if (ticket.comments.length > 3) {
    console.log('more comments')
    risk += 6
  }

  risk = Math.round(risk)

  if (risk > 2 && risk < 98) return risk
  else if (risk > 98) return 98
  return 2
}
