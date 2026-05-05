import express from "express";

const router = express.Router();

import {getAllCryptos, getGainers, addCrypto, getNewListings} from "../controllers/cryptoController.js";
import protect from "../middleware/authMiddleware.js";


router.get("/crypto/gainers", getGainers);
router.get("/crypto/new", getNewListings);
router.get("/crypto", getAllCryptos);
router.post("/crypto", addCrypto);
router.post("/crypto", protect, addCrypto);

export default router;
