import { errorMessage } from "../utils/utils.js";
import { authMiddlewareService } from "./middleware.service.js";
import { findUserByService } from "./user.service.js";

export const userMiddleware = async (req, res, next) => {
    let header = req.headers.authorization;
    let jwtVerifier = await authMiddlewareService(header, res);
    if(!jwtVerifier) return;
    if (jwtVerifier.isAdmin === true)
        return errorMessage(401, "Authorization Denied")(res);
    req.user = jwtVerifier.id;
    req.userData = await findUserByService({_id: jwtVerifier.id})
    return next();
}

