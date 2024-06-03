import React from 'react'
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './Components/config';
import MessageParser from './Components/MessageParser';
import ActionProvider from './Components/ActionProvider';
import './chatbot.css'

const ChatBot = () => {
  return (
    <div className='maindiv'>
      <div className='Chatbot_div'>
        <Chatbot 
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
                />
      </div>
    </div>
  )
}

export default ChatBot