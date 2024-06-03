
import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const handleHello = () => {
        const botMessage = createChatBotMessage('We currently offer only English language courses.');
        updatestate(botMessage)
      };

      const handlebtn1request = () => {
        const botMessage = createChatBotMessage('Our online language school is an educational platform that offers language courses over the Internet. Classes are conducted by experienced instructors, and teaching materials are tailored to the individual needs of the student.');
        updatestate(botMessage)
      };

      const updatestate = (botMessage) => {    
        setState((prev) => ({...prev,messages: [...prev.messages, botMessage],}));
      };


       // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handlebtn1request
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;