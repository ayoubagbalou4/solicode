import React from 'react'

const Contact = () => {
  return (
    <div id="contact" className="contact">
    <div className="leftSideContact">
        <img src="images/Bottle of water-cuate (1).svg" alt=""/>
    </div>
    <div className="rightSideContact">
        <h2><span>Contact</span> Us</h2>
        <form action="">
            <input type="text" placeholder="Your Name" />
            <input type="text" placeholder="Your Email"/>
            <textarea name="" id="" cols="30" rows="10" placeholder="Your Message"></textarea>
            <button>Submit</button>
        </form>
    </div>
</div>
  )
}

export default Contact
