import React from "react";

const TextImage = props => {
  //  const { title, text } = props;

  return (
    <div>
      <h5 className="light">{props.title}</h5>
      <div>
        <CleanImage image={props.image} />
      </div>
      <div>
        <p dangerouslySetInnerHTML={{ __html: props.text }} />
      </div>
      <div className="component-name">TextImage</div>
    </div>
  );
};

const CleanImage = props => {
  if (props.image) {
    var damURL =
      process.env.REACT_APP_ORIGIN + props.image.renditions["480"].link;

    return <img className="img-responsive" src={damURL} alt="TextIm alt." />;
  }
  return null;
};

export default TextImage;
