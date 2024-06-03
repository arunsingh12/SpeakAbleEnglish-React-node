import React from 'react'

const MyCustomAvatar = () => {


    const MyCustomAvatarstyle ={
        width:'50px',
        height:'50px',
        borderRadius:'50%',
        marginLeft:"10px",
        backgroundImage:`url(https://i.pinimg.com/564x/8c/52/f6/8c52f66de4993f91c053dc1f97601cf0.jpg)`,
        backgroundSize:'cover',
        backgroundPosition:"center"
    }


  return (
    <div style={MyCustomAvatarstyle}></div>
  )
}

export default MyCustomAvatar