const SERVER = "http://localhost:8080";
const SERVER_PATH = "/magnoliaAuthor" ;


const ENVIRONMENT = {
	production: false,
	server: SERVER,
	restUrlBase: SERVER + SERVER_PATH + "/.rest/delivery/pages/v1",
	restUrlNav: SERVER + SERVER_PATH + "/.rest/delivery/pagenav/v1",
	serverPath: SERVER_PATH,
	rootCmsPath: "/solar-system",
	
	damUrl: SERVER + SERVER_PATH,
	staticFilePath: SERVER + SERVER_PATH + "/.resources/react-aliens/webresources/static",
	
	DEBUG_MODE: true,
	USE_SAMPLE_DATA: false
};
// + "/dam/",
export default ENVIRONMENT;
