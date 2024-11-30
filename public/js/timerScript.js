const timerElement = document.getElementById('timer')

let countdownTime = 12 * 60 * 60

function updateTimer() {
  const hours = Math.floor(countdownTime / 3600)
  const minutes = Math.floor((countdownTime % 3600) / 60)
  const seconds = countdownTime % 60

  timerElement.textContent = `${formatTime(hours)}:${formatTime(
    minutes
  )}:${formatTime(seconds)}`

  if (countdownTime > 0) {
    countdownTime--
  } else {
    clearInterval(timerInterval)
    alert('Time is up!')
  }
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time
}

const timerInterval = setInterval(updateTimer, 1000)
