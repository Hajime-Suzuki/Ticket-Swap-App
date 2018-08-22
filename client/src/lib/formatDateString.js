export const formatDate = dateStr =>
  dateStr.replace(/^(\d{4})-(\d{2})-(\d{2}).*/, '$3/$2/$1')
