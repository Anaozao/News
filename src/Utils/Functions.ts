import { NewsType } from "../types"

export const timeAgo = (news: NewsType[], setTime: React.Dispatch<React.SetStateAction<string>>) => {
  if (news.length > 0) {
    const [date, time] = news[0].data_publicacao.split(' ')
    const [day, month, year] = date.split('/').map(Number)
    const [hours, minutes, seconds] = time.split(':').map(Number)
    const newsDate = new Date(year, month - 1, day, hours, minutes, seconds)
    const today = new Date()

    const difference = today.getTime() - newsDate.getTime()
    const daysDifference = Math.floor(difference / (1000 * 3600 * 24))
    const hoursDifference = Math.floor((difference % (1000 * 3600 * 24)) / (1000 * 3600))

    let timeString = ""
    if (daysDifference > 0) {
      timeString += `${daysDifference} dia(s) `
    }
    if (hoursDifference > 0) {
      timeString += `${hoursDifference} hora(s) `
    }
    if (daysDifference < 1 && hoursDifference < 1) {
      timeString = 'Menos de 1 hora'
    }
    setTime(timeString)
  }
}

export const timeAgoCard = (news: NewsType, setTime: React.Dispatch<React.SetStateAction<string>>) => {
  if (news) {
    const [date, time] = news.data_publicacao.split(' ')
    const [day, month, year] = date.split('/').map(Number)
    const [hours, minutes, seconds] = time.split(':').map(Number)
    const newsDate = new Date(year, month - 1, day, hours, minutes, seconds)
    const today = new Date()

    const difference = today.getTime() - newsDate.getTime()
    const daysDifference = Math.floor(difference / (1000 * 3600 * 24))
    const hoursDifference = Math.floor((difference % (1000 * 3600 * 24)) / (1000 * 3600))

    let timeString = ""
    if (daysDifference > 0) {
      timeString += `${daysDifference} dia(s) `
    }
    if (hoursDifference > 0) {
      timeString += `${hoursDifference} hora(s) `
    }
    setTime(timeString)
  }
}