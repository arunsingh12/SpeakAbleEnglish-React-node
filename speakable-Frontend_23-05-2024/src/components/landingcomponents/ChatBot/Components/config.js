import { createChatBotMessage } from 'react-chatbot-kit';
import MyAvatar from '../chatbotcomponent/MyAvatar';
import MyCustomAvatar from '../chatbotcomponent/MyCustomAvatar';
import Startbtn from '../chatbotcomponent/Startbtn';
const botName = 'Speakable English';





const config = {
  initialMessages: [createChatBotMessage(`Hii,Welcome to ${botName}`,{
    widget:"startbtn"
  })],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#33906c',
    },
    chatButton: {
      backgroundColor: '#33906c',
    },
  },

  customComponents: {
    // Replaces the default header
   header: () =>( <div style={{ backgroundColor: 'white',color:'#33906c',fontSize:"20px", padding: "5px", borderRadius: "3px",borderBottom:"1px solid #33906c" }}>Welcome to {botName}</div>),
   // Replaces the default bot avatar
   botAvatar: (props) => <MyAvatar {...props} />,
//    // Replaces the default user icon
   userAvatar: (props) => <MyCustomAvatar {...props} />,
 },

 state: {
  
  },


 widgets: [
    {
      widgetName: 'startbtn',
      widgetFunc: (props) => <Startbtn {...props} />,
    },
    
  ],

};

export default config;