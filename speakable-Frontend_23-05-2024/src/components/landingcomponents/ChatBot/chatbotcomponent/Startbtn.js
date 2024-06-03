import React from 'react'

const Startbtn = (props) => {

const btn1request = () =>{
    props.actions.handlebtn1request()

}

const btn2request = () => {
    props.actions.handleHello()

}


  return (
    <div >
     <button className='btn btn-outline-success ms-5' onClick={()=>btn1request()}>What is our online language school?</button>
     <button className='btn btn-outline-success ms-5 mt-2' onClick={()=>btn2request()} >What languages can I learn with you?</button>
    </div>
  )
}

export default Startbtn