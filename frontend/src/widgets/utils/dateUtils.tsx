export function minDate(today: Date) {
  let day: string = "";
  let month: string = "";
  let fullDate: string = "";

  if (today.getDate() < 10) {
    day = "0" + today.getDate().toString();
  } else {
    day = today.getDate().toString();
  }
  if (today.getMonth() < 10) {
    month = "0" + (today.getMonth() + 1).toString();
  } else {
    month = (today.getMonth() + 1).toString();
  }

  fullDate = today.getFullYear().toString() + "-" + month + "-" + day;

  return fullDate;
}

export function epochToDate(date: string) {
  let stringDate = new Date(parseInt(date) * 1000);
  return stringDate;
}

export function textDate(date: Date) {
  let day: string = "";
  let month: string = "";
  let fullDate: string = "";

  if (date.getDate() < 10) {
    day = "0" + date.getDate().toString();
  } else {
    day = date.getDate().toString();
  }
  if (date.getMonth() < 10) {
    month = "0" + (date.getMonth() + 1).toString();
  } else {
    month = (date.getMonth() + 1).toString();
  }

  fullDate = day + "/" + month + "/" + date.getFullYear().toString();

  return fullDate;
}
