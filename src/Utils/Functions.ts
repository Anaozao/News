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

    let timeString = ""
    if (daysDifference > 0) {
      timeString += `${daysDifference} dia(s) `
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

    let timeString = ""
    if (daysDifference > 0) {
      timeString += `${daysDifference} dia(s) `
    }
    setTime(timeString)
  }
}