export function apiLink() {
  // ！ for production
  return '';
  // ! for development
  // return "http://localhost:8080";
}

export function dateStringToDateLocal(dateString: string) {
  let fulldate = new Date(dateString).toLocaleString('SGT', {
    timeZone: 'Asia/Singapore',
    hour12: false
  }).split(/[ ,:]+/);

  const date = fulldate[0].split('/');

  const year = date[2];
  const month = date[1];
  const day = date[0];
  const hour = fulldate[1];
  const minute = fulldate[2];
  const second = fulldate[3];
  const isoDateString = `${year}-${month}-${day}T${hour}:${minute}:${second}.000`;
  return isoDateString;
}