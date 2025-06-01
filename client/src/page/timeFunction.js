export const dateFormat = (eventDate) => {
  const date = new Date(Number(eventDate))
  return date.toLocaleDateString('en-GB')
}
export const timeDifference = (pastDate) => {
  const now = new Date()
  const differenceInSeconds = Math.floor((now - pastDate) / 1000)

  if (differenceInSeconds < 60) {
    if (differenceInSeconds == 1) {
      return `${differenceInSeconds} second ago`
    }
    return `${differenceInSeconds} seconds ago`
  } else if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60)
    if (minutes == 1) {
      return `${minutes} minute ago`
    }
    return `${minutes} minutes ago`
  } else if (differenceInSeconds < 86400) {
    const hours = Math.floor(differenceInSeconds / 3600)
    if (hours == 1) {
      return `${hours} hour ago`
    }
    return `${hours} hours ago`
  } else if (differenceInSeconds < 2592000) {
    // Less than 30 days
    const days = Math.floor(differenceInSeconds / 86400)
    if (days == 1) {
      return `${days} day ago`
    }
    return `${days} days ago`
  } else {
    const months = Math.floor(differenceInSeconds / 2592000)
    if (months == 1) {
      return `${months} month ago`
    }
    return `${months} months ago`
  }
}
