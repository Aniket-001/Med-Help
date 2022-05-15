import React from 'react'

const Foot = () => {
    return (
        <>
            <div className="foot">
                <div className="foot1">
                    <ul>
                        <li><i className="fa-brands fa-facebook-f"></i></li>
                        <li><i className="fa-brands fa-instagram"></i></li>
                        <li><i className="fa-brands fa-twitter"></i></li>
                    </ul>
                </div>
                <div className="foot2">
                    <ul>
                        <li>COMPANY</li>
                        <li>About</li>
                        <li>Blog</li>
                        <li>Press</li>
                    </ul>
                </div>
                <div className="foot3">
                    <ul>
                        <li>TERMS & POLICIES</li>
                        <li>Policies</li>
                        <li>Terms of use</li>
                        <li>Privacy</li>
                    </ul>
                </div>
                <div className="copyright">{new Date().getFullYear()} © Med-Help</div>
            </div>
        </>
    )
}

export default Foot
