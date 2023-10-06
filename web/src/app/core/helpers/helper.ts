export function apiLink() {
  // ！ for production
  return '';
  // ! for development
  // return "http://localhost:8080";
}

export function dateStringToDateLocal(dateString: string) {
  let date = new Date(dateString).toLocaleString('SGT', {
    timeZone: 'Asia/Singapore',
    hour12: false
  }).split(/[ ,:]+/);
  const year = date[2];
  const month = date[1];
  const day = date[0];
  const hour = date[3];
  const minute = date[4];
  const second = date[5];
  const isoDateString = `${year}-${month}-${day}T${hour}:${minute}:${second}.000`;
  return isoDateString;
}