function formatTime(time) {
  const minutes = Math.floor(time / 60);

  const seconds = time % 60;

  if (minutes === 0 && seconds < 10) {
    return `00:0${seconds}`;
  } else if (minutes < 10 && seconds < 10) {
    return `0${minutes}:0${seconds}`;
  } else if (seconds < 10) {
    return `${minutes}:0${seconds}`;
  } else {
    return `00:${seconds}`;
  }
}

export { formatTime };
