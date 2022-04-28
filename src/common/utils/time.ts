export function timeToSeconds(time: string) {
  const [hh = '0', mm = '0', ss = '0'] = time.split(':')
  const seconds = Number(hh) * 3600 + Number(mm) * 60 + Number(ss)
  return seconds
}