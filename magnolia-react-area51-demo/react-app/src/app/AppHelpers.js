import ENVIRONMENT from "../environments/environment"

export function dlog(message) {
    if (ENVIRONMENT.DEBUG_MODE){
        console.log(message);
    }
}

