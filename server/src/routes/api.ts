import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ data: "api" });
});

export { router };
