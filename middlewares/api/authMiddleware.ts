export function authMiddleware(request: Request){

    const token = request.headers.get("authorization")?.split(" ")[1];

    if(token){
        return true;
    }

    return false;
}