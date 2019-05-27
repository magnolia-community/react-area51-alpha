import PageStandard from "./component/PageStandard";

import Title from "./component/Title";
import TextImage from "./component/TextImage";
import SlideShow from "./component/SlideShow";
import Slide from "./component/Slide";
import CommentComponent from "./component/comments/CommentComponent";

const COMPONENTS = {
  "react-aliens:pages/standard": PageStandard,

  "magnolia-aliens:components/slide": Slide,
  "magnolia-aliens:components/slideshow": SlideShow,
  "magnolia-aliens:components/title": Title,
  "magnolia-aliens:components/text-image": TextImage,
  "elastic-comments:components/comments": CommentComponent
};

export default COMPONENTS;
