import React from 'react'
import SignupSigninComponenent from '../componentes/SignUpSignIn'
import Header from '../componentes/Header'
function signup() {
  return <div>
    <Header/>
    {<div className="wrapper">
      <SignupSigninComponenent/>
    </div> }
  </div>
}

export default signup