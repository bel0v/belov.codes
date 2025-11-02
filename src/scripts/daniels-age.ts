import dayjs from 'dayjs'

function calculateDanielAgeParts() {
  const today = dayjs(new Date())
  const birthDate = dayjs('2025-09-13')

  const years = today.diff(birthDate, 'year')
  const months = today.diff(birthDate.add(years, 'year'), 'month')
  const weeks = today.diff(birthDate.add(years, 'year').add(months, 'month'), 'week')
  return { years, months, weeks }
}

function formatAge(years: number, months: number, weeks: number) {
  const listformat = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })
  const yearsStr = `${years} ${years > 1 ? 'years' : 'year'}`
  const monthsStr = `${months} ${months > 1 ? 'months' : 'month'}`
  const weeksStr = `${weeks} ${weeks > 1 ? 'weeks' : 'week'}`

  if (years >= 1) {
    return listformat.format([yearsStr, ...(months > 0 ? [monthsStr] : [])])
  }
  return listformat.format([monthsStr, ...(weeks > 0 ? [weeksStr] : [])])
}

export function getDanielsAge() {
  const { years, months, weeks } = calculateDanielAgeParts()
  console.log(formatAge(years, months, weeks))
  return formatAge(years, months, weeks)
}
