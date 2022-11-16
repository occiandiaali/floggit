// Helper code e.g. for validation, randomiser, formatter...

// display when post was created
const timeAgo = date => {
  let theDate = new Date();
  let seconds = Math.floor((theDate.getTime() - date) / 1000);
  let interval = seconds / 31536000;
  //   if (interval > 1) {
  //     return Math.floor(interval) + 'yr';
  //   }
  //   let interval = seconds / 2592000;
  //   if (interval > 1) {
  //     return Math.floor(interval) + 'mo';
  //   }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' d';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' h';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' m';
  }
  return Math.floor(seconds) + ' s';
};

function makeReadable(num, singular) {
  return num > 0
    ? num + (num === 1 ? ` ${singular}, ` : ` ${singular}s, `)
    : '';
}

function toDaysHoursMins(totalSeconds) {
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const days = Math.floor(totalSeconds % (3600 * 24));

  const minStr = makeReadable(minutes, 'minute');
  const hrStr = makeReadable(hours, 'hour');
  const dayStr = makeReadable(days, 'day');

  return `${dayStr}${hrStr}${minStr}`.replace(/,\s*$/, '');
}

export {toDaysHoursMins};
