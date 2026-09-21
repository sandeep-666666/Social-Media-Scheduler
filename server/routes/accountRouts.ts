import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { addAccounts, getAccounts,dicconnectAccounts } from "../controllers/accountControllers.js"

const accountRouter = express.Router()

accountRouter.get("/", protect, getAccounts)
accountRouter.post("/", protect, addAccounts)
accountRouter.delete("/:id", protect, dicconnectAccounts)

export default accountRouter;