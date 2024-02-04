import { Avatar, Box, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(message: string) {
  if (message.includes('```')) {
    const blocks = message.split('```');
    console.log(blocks);
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes('=') ||
    str.includes(';') ||
    str.includes('[') ||
    str.includes(']') ||
    str.includes('{') ||
    str.includes('}') ||
    str.includes('//')
  ) {
    return true;
  }
  return false;
}
const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: 'user' | 'assistant';
}) => {
  const messageBlocks = extractCodeFromString(content);

  const auth = useAuth();
  return role === 'assistant' ? (
    <Box
      sx={{
        // display: 'flex',
        // p: 2,
        // bgcolor: 'white',
        // my: 2,
        // gap: 2,
        display: 'flex',
        p: 0.5,
        bgcolor: 'white',
        // bgcolor: '#00d0db',
        gap: 2,
        borderRadius: '22px',
        m: 1,
        mr: '25%',
        width: '70%',
        // overflow: 'scroll',
        // overflowY: 'auto',
        // overflowX: 'auto',
      }}
    >
      <Avatar
        sx={{
          // ml: 0,
          width: '35px',
          height: '35px',
        }}
      >
        <img src="chatbot3.jpg" alt="chat-logo" width={'35px'} />
      </Avatar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
        }}
      >
        {/* <Typography fontSize={'20px'} color={'#292f38'}>
          {content}
        </Typography> */}
        {!messageBlocks && (
          <Typography fontSize={'20px'} color={'#292f38'}>
            {content}
          </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography fontSize={'20px'} color={'#292f38'}>
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        p: 0.5,
        bgcolor: '#00d0db',
        // bgcolor: 'white',
        gap: 2,
        borderRadius: '22px',
        m: 1,
        ml: '25%',
        width: '70%',
        // overflow: 'scroll',
        // overflowY: 'auto',
        // overflowX: 'auto',
        justifyContent: 'flex-end',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'center',
          ml: 0.5,
        }}
      >
        <Typography fontSize={'20px'} color={'#292f38'}>
          {content}
        </Typography>
      </Box>
      <Avatar
        sx={{
          ml: 0,
          bgcolor: 'black',
          color: 'white',
          fontWeight: 700,
          width: '35px',
          height: '35px',
        }}
      >
        {auth?.user?.name[0]}
      </Avatar>
    </Box>
  );
};

export default ChatItem;
