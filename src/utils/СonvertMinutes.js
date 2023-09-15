export const convertMinutes = (minutes) => {
  var hours = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const resultTime = [];

  if (hours) resultTime.push(`${hours}ч`);
  if (minute) resultTime.push(`${minute}м`);

  return resultTime.join(' ');
}

