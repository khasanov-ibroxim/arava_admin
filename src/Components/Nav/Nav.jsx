import React, { useState } from 'react'
import './Nav.css'
import {UserOutlined} from "@ant-design/icons";

function Nav() {
  const [show, setShow] = useState(false)

  return (
    <nav>
      <div className=''>
        <div className='row'>
          <div className='col-lg-12'>
            <h1 className="left"></h1>
            <div className="right">
              <select name="" id="">
                <option value="">US</option>
                <option value="">RU</option>
                <option value="">UZ</option>
              </select>
              <div onClick={() => setShow(!show)} className="foto">
                <UserOutlined />
              </div>
              <div className={show ? 'null' : 'profil'}>
                <p className="name"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav