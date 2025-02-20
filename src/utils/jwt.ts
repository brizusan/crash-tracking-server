import jwt, { JwtPayload } from "jsonwebtoken";

export const generateJWT = (payload: JwtPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return token;
};

export const decodedToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  return decoded;
};
