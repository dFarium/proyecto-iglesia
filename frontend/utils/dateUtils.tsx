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


export function textDefaultDate(date: Date) {
  let day: string = "";
  let month: string = "";
  let fullDate: string = "";

  let nDate = new Date(date);

  if (nDate.getDate() < 10) {
    day = "0" + nDate.getDate().toString();
  } else {
    day = nDate.getDate().toString();
  }
  if (nDate.getMonth() < 10) {
    month = "0" + (nDate.getMonth() + 1).toString();
  } else {
    month = (nDate.getMonth() + 1).toString();
  }

  fullDate = nDate.getFullYear().toString() + "-" + month + "-" + day;

  return fullDate;
}

export function textDate(date: Date) {
  let day: string = "";
  let month: string = "";
  let fullDate: string = "";

  let nDate = new Date(date);

  if (nDate.getDate() < 10) {
    day = "0" + nDate.getDate().toString();
  } else {
    day = nDate.getDate().toString();
  }
  if (nDate.getMonth() < 10) {
    month = "0" + (nDate.getMonth() + 1).toString();
  } else {
    month = (nDate.getMonth() + 1).toString();
  }

  fullDate = day + "/" + month + "/" + nDate.getFullYear().toString();

  return fullDate;
}
