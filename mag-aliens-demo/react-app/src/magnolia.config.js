import Standard from "./Pages/Standard";
import SlideShow from "./Components/SlideShow";
import Slide from "./Components/Slide";
import Title from "./Components/Title";
import TextImage from "./Components/TextImage";

const config = {
  templates: {
    "react-aliens:pages/standard": Standard,

    "magnolia-aliens:components/slide": Slide,
    "magnolia-aliens:components/slideshow": SlideShow,
    "magnolia-aliens:components/title": Title,
    "magnolia-aliens:components/text-image": TextImage
  },
  getChildren: areaProps => areaProps["@nodes"].map(node => areaProps[node])
};

export default config;
