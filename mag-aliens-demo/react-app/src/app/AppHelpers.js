import ENVIRONMENT from "../environments/environment"

export function dlog(message) {
    if (ENVIRONMENT.DEBUG_MODE){
        console.log(message);
    }
}

/* Get the path of an item relative to it's page.

For example if a component is /myproject/mypage/area/comp2,
then it will return just /area/comp2.
*/
export function getRelativePath(path, serverPath, rootCmsPath, inPageEditor){
    if (inPageEditor){
        dlog("NAV: inPageEdigtor:" + serverPath + path)
        return serverPath + path;
    }else{
        dlog("NAV: Not in page editor.");
        // Just strip off the pathOfPage. We assume it is the correct path root.
        var relativePath = path.substr(rootCmsPath.length);
        return relativePath;
    }
}

export function getLink(path, serverPath, rootCmsPath, inPageEditor){
    var link = getRelativePath(path, serverPath, rootCmsPath, inPageEditor);
    if (inPageEditor){
        //link += rootCmsPath;
        link += ".html";
    }
    return link;
}

export function inPageEditor(){
    if (window.inPageEditor === true){
        return true;
    } else{
        return false;
    }
}

