import React from "react";

function timeSince(timeStamp) {
  let now = new Date(),
    secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  if (secondsPast < 60) {
    return parseInt(secondsPast) + "s";
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + "m";
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + "h";
  }
  if (secondsPast > 86400) {
    let day = timeStamp.getDate();
    let month = timeStamp
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(" ", "");
    let year =
      timeStamp.getFullYear() === now.getFullYear()
        ? ""
        : " " + timeStamp.getFullYear();
    return day + " " + month + year;
  }
}

export default function Comment(props) {
  const { name, message, time } = props.comment;
  const relTime = timeSince(new Date(time));
  console.log("result: " + relTime);

  return (
    <div className="media mb-3">
      <img
        className="mr-3 bg-light rounded"
        width="48"
        height="48"
        src={`https://api.adorable.io/avatars/48/${name.toLowerCase()}@adorable.io.png`}
        alt={name}
      />

      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <small className="float-right text-muted">{relTime}</small>
        <h6 className="mt-0 mb-1 text-muted">{name}</h6>
        {message}
      </div>
    </div>
  );
}
