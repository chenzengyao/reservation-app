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

  console.log("date: ", date);

  const year = date[2];
  const month = date[0];
  const day = date[1];
  const hour = fulldate[1];
  const minute = fulldate[2];
  const second = fulldate[3];
  const isoDateString = `${year}-${month}-${day}T${hour}:${minute}`;
  console.log("isoDateString: ", isoDateString);
  return isoDateString;
}

export const getSafeImagePath = (imagePath: string) => {
  const protocol = "https://"
  const domain = "res.cloudinary.com"
  const path = "/hx1dfduy4/assests/images/"

  const url_path = protocol + domain + path;

  return url_path + imagePath;
};