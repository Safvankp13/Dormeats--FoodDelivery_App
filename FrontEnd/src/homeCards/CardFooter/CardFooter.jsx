import React from 'react'
import "./cardfooter.scss"
const CardFooter = () => {
  return (
    <footer className='footer'>
        <div className="footer--top">
            <div className="footer--top--left">
                <h2>Get in touch</h2>
                <p>Feel free to contact us :</p>
            </div>
            <div className="footer--top--right">
                <div className="footer--top--right--flex">
                    <div className="footer--top--right--flex--left">
                        <p>Address:</p>
                        <p>Phone:</p>
                        <p>Email:</p>
                    </div>
                    <div className="footer--top--right--flex--right">
                        <p>123, Main Road, New Delhi, India</p>
                        <p>+91 1234567890</p>
                        <p>@2025 dormeats</p>
                        

            </div>
            </div>
            </div>
        </div>
    </footer>
  )
}

export default CardFooter