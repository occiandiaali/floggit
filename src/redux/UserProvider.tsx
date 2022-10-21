import React from 'react';
import {UserContext} from './UserContext';

const UserProvider = ({children}) => {
  // const [user, setUser] = React.useState({name: '', auth: true});
  const [user, setUser] = React.useState('');
  const [auth, setAuth] = React.useState(true);

  const login = (name: string, confirmed: boolean) => {
    setUser(name);
    setAuth(confirmed);
  };
  return (
    <UserContext.Provider value={{user, auth, login}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
