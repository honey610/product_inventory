import  Router  from "express";
import { updateUserRole } from "../controllers/userrolechange.js";
import { requireRole } from "../middleware/requireRole.js";
import { protect } from "../middleware/protect.middleware.js";

const router=Router();

router.put('/users/:id/role',protect,requireRole("ADMIN"),updateUserRole);

export default router;