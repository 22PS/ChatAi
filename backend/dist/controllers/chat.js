import User from '../models/User.js';
import { OpenAIApi } from 'openai';
import { configureOpenAI } from '../config/openai.js';
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: 'User not found' });
        // grab chats of user
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));
        chats.push({ content: message, role: 'user' });
        user.chats.push({ content: message, role: 'user' });
        // send all chats with new one to OpenAI API
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        // get latest response
        const chatResponse = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: chats,
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send('User not found');
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send('Permission denied');
        }
        return res.status(200).json({ message: 'OK', chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Error', cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send('User not found');
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send('Permission denied');
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: 'OK' });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Error', cause: error.message });
    }
};
//# sourceMappingURL=chat.js.map