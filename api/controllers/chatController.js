import ConversationModel from '../models/chatModel.js'
import MessageModel from '../models/messagesModel.js'
import Pharmacsit from '../models/pharmacistModel.js'
import Doctor from '../models/doctorModel.js'

const newChat = async (req, res) => {
    try {
        const { senderId, receiverId, senderName, receiverName } = req.body
        const chat = new ConversationModel({
            members: [senderId, receiverId],
            membersInfo: [senderName, receiverName],
        })
        await chat.save()
        res.status(201).json({ message: 'Chat created successfully', chat })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

const getChats = async (req, res) => {
    try {
        const { userId } = req.params
        const chats = await ConversationModel.find({
            members: { $in: [userId] },
        })
        res.status(200).json(chats)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
};

const newMessage = async (req, res) => {
    const newMessage = new MessageModel(req.body)
    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (err) {
        res.status(500).json(err)
    }
};

const getMessages = async (req, res) => {
    const { conversationId } = req.params
    try {
        const messages = await MessageModel.find({
            conversationId: conversationId,
        })
        res.status(200).json(messages)
    } catch (err) {
        res.status(500).json(err)
    }
};

const getPatientContacts = async (req, res) => {
    try {
        const { userId } = req.params
        const chats = await ConversationModel.find({
            members: { $in: [userId] },
        })
        let contacts = await Pharmacsit.find();
        //output who are not in chats
        contacts = contacts.filter(item => {return !chats.some((chat) =>
            chat.members.includes(item._id)
        )});
        contacts = contacts.map((contact) => {
            return {
                _id: contact._id,
                name: contact.name,
            }
        })
        res.status(200).json(contacts)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
};

 const getPharmacistContacts = async (req, res) => {
    try {
        const { userId } = req.params
        const chats = await ConversationModel.find({
            members: { $in: [userId] },
        })
        let contacts = await Doctor.find({contract_acceptance:"Accepted"});
        //output who are not in chats
        contacts = contacts.filter(item => {return !chats.some((chat) =>
            chat.members.includes(item._id)
        )});
        contacts = contacts.map((contact) => {
            return {
                _id: contact._id,
                name: contact.name,
            }
        })
        res.status(200).json(contacts)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
};

export { newChat, getChats, newMessage, getMessages , getPatientContacts , getPharmacistContacts }
