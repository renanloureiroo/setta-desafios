function formatTime(time) {
  const minutes = Math.floor(time / 60);

  const seconds = time % 60;

  return minutes === 0 && seconds < 10
    ? `00:0${seconds}`
    : seconds < 10
    ? `${minutes}:0${seconds}`
    : minutes === 0
    ? `00:${seconds}`
    : minutes < 10
    ? `0${minutes}:${seconds}`
    : `${minutes}:${seconds}`;
}

export { formatTime };
