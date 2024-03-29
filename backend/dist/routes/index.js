import { Router } from 'express';
import userRoutes from './user.js';
import chatRoutes from './chat.js';
const appRouter = Router();
appRouter.use('/user', userRoutes); // domain/api/api/v1/user
appRouter.use('/chat', chatRoutes); // domain/api/api/v1/chats
export default appRouter;
//# sourceMappingURL=index.js.map