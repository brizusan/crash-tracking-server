import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  limit: 10, // 5 request por minuto
  max: 10, // limit each IP to 100 requests per windowMs
  message: {
    message: "Limite de peticiones excedido",
  },
});
