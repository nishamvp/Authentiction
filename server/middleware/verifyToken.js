import jwt from "jsonwebtoken";

const verifyToken = async (request, response, next) => {
  const refreshToken = request.cookies.jwt;
  const accessToken = request.headers["Authorization"];
  if (!refreshToken && !accessToken)
    return response.status(401).json({ error: "No token Provided" });
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    console.log('here')
    request.email = decoded.email;
    return next();
  } catch (error) {
    console.log(error)
    if (!refreshToken) {
      return response
        .status(401)
        .json({ error: "Access denied. No refresh token provided" });
    }
    try {
      const decodedRefresh = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET
      );

      const newAccessToken = jwt.sign(
        { email: decodedRefresh.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
      );
      request.email = decodedRefresh.email;
      response.header("Authorization", newAccessToken)
      return next();
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Refresh token expired or invalid" });
    }
  }
};

export default verifyToken;
