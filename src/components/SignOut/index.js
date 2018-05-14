import React from 'react';

import { auth } from '../../firebase';

const SignOutButton = () =>
  <div style={{'textAlign': 'center'}} onClick={auth.doSignOut}>Sign Out</div>
  // <button
  //   type="button"
  //   onClick={auth.doSignOut}
  // >
  // </button>

export default SignOutButton;