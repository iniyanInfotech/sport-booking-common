import jwt from "jsonwebtoken";

export function generateJwtToken(payload: any) {
  const token = jwt.sign(
    {
      data: payload,
    },
    String(process.env.JWT_SECRET),
    { expiresIn: process.env.JWT_EXPIRATION }
  );
  return token;
}

export function verifyToken(token: string) {
  const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
  return decoded;
}
