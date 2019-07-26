import React from "react";

const Slide = props => {
  //  const { title, body, image } = props;

  return (
    <div className="card slide" style={{ width: "18rem" }}>
      <CardImage image={props.image} />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.body}</p>
      </div>
    </div>
  );
};

const CardImage = props => {
  if (props.image) {
    var damURL =
      process.env.REACT_APP_ORIGIN + props.image.renditions["480"].link;

    return <img className="card-img-top" src={damURL} alt="Card alt." />;
  }
  return null;
};

export default Slide;
