import jwt from "jsonwebtoken";

const verifyToken = async (request, response, next) => {
  const refreshToken = request.cookies.jwt;
  const accessToken = request.headers["access-token"];
  if (!refreshToken && !accessToken)
    return response.status(401).json({ error: "No token Provided" });
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    request.email = decoded.email;
    next();
  } catch (error) {
    if (!refreshToken) {
      return response
        .status(401)
        .json({ error: "Access denied. No refresh token provided" });
    }
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );

    const accessToken = jwt.sign(
      { email: decoded.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );
    return response.json(accessToken);
  }
};

export default verifyToken;
