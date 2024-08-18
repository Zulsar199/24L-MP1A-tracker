import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  if (req.path.startsWith("/auth")) return next();

  const auth = req.headers.authorization;

  const token = auth?.split(" ")[1];
  console.log(token, "token");

  if (!token) return res.status(401).json({ error: "Нэвтрэнэ үү!" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(user, "user");
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Нэвтрэнэ үү!" });
  }
};
