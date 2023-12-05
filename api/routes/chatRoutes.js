import express from 'express'
import {
    newChat,
    getChats,
    newMessage,
    getMessages,
    getPatientContacts,
    getPharmacistContacts,
} from '../controllers/chatController.js'
const router = express.Router()

router.post('/new-chat', newChat)
router.get('/get-chats/:userId', getChats)
router.post('/send-message', newMessage)
router.get('/get-messages/:conversationId', getMessages)
router.get('/get-patient-contacts/:userId', getPatientContacts)
router.get('/get-pharmacist-contacts/:userId', getPharmacistContacts)

export default router
