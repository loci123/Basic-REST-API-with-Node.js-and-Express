
import LogoutHeader from "../Component/LogoutHeader"
import React, { useEffect, useState } from 'react';

function Admin() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);
    return (
        <>
            <LogoutHeader />
            <div>
                <h4>Admin</h4>
                <h1>Welcome {user.name}</h1>
                
            </div>
        </>
    )
}

export default Admin