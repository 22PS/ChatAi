import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { red } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// const chatMessages = [
//   { role: 'user', content: 'Hello, how are you?' },
//   {
//     role: 'assistant',
//     content: "I'm doing well, thank you! How can I help you today?",
//   },
//   { role: 'user', content: 'I have a question about programming.' },
//   {
//     role: 'assistant',
//     content: 'Sure, go ahead and ask your programming question.',
//   },
//   {
//     role: 'user',
//     content: 'What is the difference between Python 2 and Python 3?',
//   },
//   {
//     role: 'assistant',
//     content:
//       'Python 2 and Python 3 are different versions of the Python programming language. Python 3 introduced several changes and improvements over Python 2.',
//   },
// ];

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const Auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
    const newMessage: Message = { role: 'user', content };
    setChatMessages((prev) => [...prev, newMessage]);

    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading('Deleting Chats...', { id: 'deletechats' });
      await deleteUserChats();
      setChatMessages([]);
      toast.success('Chats deleted successfully', { id: 'deletechats' });
    } catch (error) {
      console.log(error);
      toast.error('Error deleting chats', { id: 'deletechats' });
    }
  };

  useLayoutEffect(() => {
    if (Auth?.isLoggedIn && Auth.user) {
      toast.loading('Loading Chats...', { id: 'loadchats' });
      getUserChats()
        .then((data) => {
          if (data.chats.length > 0) {
            setChatMessages([...data.chats]);
            toast.success('Chats loaded successfully', { id: 'loadchats' });
          } else {
            toast.success('No chats available', { id: 'loadchats' });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error('Error loading', { id: 'loadchats' });
        });
    }
  }, [Auth]);

  useEffect(() => {
    if (!Auth?.user) {
      return navigate('/login');
    }
  });
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        // width: '100%',
        // height: '20vh',
        mt: 5,
        gap: 3,
      }}
    >
      <Box
        sx={{
          mt: 2.5,
          display: 'none',

          // height: '75vh',
          height: '95%',
          // '@media(min-width:1000px)': {
          //   display: 'flex',
          //   flex: 0.45,
          // },
          '@media(min-width:1020px)': {
            display: 'flex',
            flex: 0.4,
          },
          '@media(min-width:1072px)': {
            display: 'flex',
            flex: 0.35,
          },
          '@media(min-width:1160px)': {
            display: 'flex',
            flex: 0.3,
          },
          '@media(min-width:1200px)': {
            flex: 0.25,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            // width: '100%',
            // height: '100%',
            bgcolor: '#4b5b72',
            borderRadius: 5,
            flexDirection: 'column',
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: 'auto',
              my: 2,
              bgcolor: 'white',
              color: 'black',
              fontWeight: 700,
            }}
          >
            {Auth?.user?.name[0]}
            {/* {Auth?.user?.name?.split(' ')[1][0]} */}
          </Avatar>
          <Typography
            sx={{
              ml: 3,
              mr: 3,
              color: 'white',
              fontSize: 20,
              fontWeight: 500,
              // fontFamily: 'work sans',
              letterSpacing: 0.8,
            }}
          >
            You are connected to ChatAi
          </Typography>
          <Typography
            sx={{
              mx: 'auto',
              my: 3,
              p: 3,
              color: 'white',
              fontSize: 18,
              fontWeight: 500,
              // fontFamily: 'work sans',
              letterSpacing: 0.8,
            }}
          >
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information.
          </Typography>
          <Button
            sx={{
              width: '80%',
              my: 'auto',
              color: 'white',
              mb: 1,
              fontWeight: 700,
              borderRadius: 3,
              mx: 'auto',
              bgcolor: red[300],
              ':hover': {
                bgcolor: red.A400,
              },
            }}
            onClick={handleDeleteChats}
          >
            Clear Chat
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          '@media(min-width:1020px)': {
            flex: 0.6,
            pl: 0,
            pr: 2,
          },
          '@media(min-width:1072px)': {
            display: 'flex',
            flex: 0.65,
            pr: 3,
          },
          '@media(min-width:1160px)': {
            display: 'flex',
            flex: 0.7,
          },
          '@media(min-width:1200px)': {
            flex: 0.75,
          },
          justifyContent: 'center',
          flexDirection: 'column',
          // pl: { md: 3, xs: 6, sm: 6 },
          // pr: 6,
          pl: 6,
          pr: 6,
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '39px',
            color: 'white',
            mb: '28px',
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: '100%',
            // height: { xl: '60vh', md: '60vh', sm: '60vh' },
            height: '60vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            // color: 'white',
            bgcolor: '#4b5b72',
          }}
        >
          {chatMessages.map((chat, index) => (
            // <div key={index}>{chat.content}</div>
            //@ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: '100%',
            // padding: '20px',
            borderRadius: 8,
            backgroundColor: '#4b5b72',
            display: 'flex',
            // margin: 'auto',
            marginTop: '16px',
            marginBottom: '16px',
          }}
        >
          {' '}
          <input
            ref={inputRef}
            type="text"
            style={{
              width: '100%',
              backgroundColor: 'white',
              // backgroundColor: 'transparent',
              padding: '10px',
              border: '1px solid',
              outline: 'none',
              color: '#292f38',
              fontSize: '20px',
              borderRadius: '10px',
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{
              ml: 'auto',
              color: 'white',
            }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
