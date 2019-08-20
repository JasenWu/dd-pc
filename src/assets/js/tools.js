export const timeout = (time) => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}

export const dateToObject = (str) => {
  let s = str.split(' ')
  let s1 = s[0].split('-')
  let s2 = s[1].split(':')

  let _t = {
    year: s1[0],
    month: s1[1] * 1 - 1,
    day: s1[2],
    hour: s2[0],
    minute: s2[1],
    second: s2[2]
  }
  return new Date(_t.year, _t.month, _t.day, _t.hour, _t.minute, _t.second)
}

export const dateFormat = (oldDate, fs = 'yyyy-MM-dd HH:ii:ss') => {
  if (!oldDate) {
    return oldDate
  }

  let date

  if (typeof oldDate === 'string') {
    date = new Date(oldDate.replace(/-/g, '/'))
  } else if (typeof oldDate === 'number') {
    date = new Date()
    date.setTime(oldDate * 1000)
  } else {
    date = oldDate
  }

  if (date.toString() === 'Invalid Date') {
    return oldDate
  }

  let week = ['日', '一', '二', '三', '四', '五', '六']
  week = week[date.getDay()]

  fs = fs
    .replace('yyyy', date.getFullYear().toString())
    .replace('MM', (date.getMonth() + 1).toString().padStart(2, '0'))
    .replace('dd', date.getDate().toString().padStart(2, '0'))
    .replace('HH', date.getHours().toString().padStart(2, '0'))
    .replace('ii', date.getMinutes().toString().padStart(2, '0'))
    .replace('ss', date.getSeconds().toString().padStart(2, '0'))
    .replace('ww', week)
    .replace('w', date.getDay().toString())

  return fs
}
