const SERVER = "http://localhost:8080";
const SERVER_PATH = "/magnoliaAuthor";

const ENVIRONMENT = {
  server: SERVER,
  restUrlBase: SERVER + SERVER_PATH + "/.rest/delivery/pages/v1",
  restUrlNav: SERVER + SERVER_PATH + "/.rest/delivery/pagenav/v1",
  serverPath: SERVER_PATH,
  rootCmsPath: "/cra-minimal",

  damUrl: SERVER + SERVER_PATH,
  staticFilePath:
    SERVER + SERVER_PATH + "/.resources/react-aliens/webresources/static"
};

export default ENVIRONMENT;