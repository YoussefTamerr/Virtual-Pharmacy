import express from "express";
import {
  newChat,
  getChats,
  newMessage,
  getMessages,
  getPatientContacts,
  getPharmacistContacts,
} from "../controllers/chatController.js";
const router = express.Router();

router.post("/", newChat);
router.get("/:userId", getChats);
router.post("/messages", newMessage);
router.get("/messages/:conversationId", getMessages);
router.get("/patient-contacts/:userId", getPatientContacts);
router.get("/pharmacist-contacts/:userId", getPharmacistContacts);

export default router;
