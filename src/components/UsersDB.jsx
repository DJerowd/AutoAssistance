import { useState } from 'react';

export const UsersDB = () => {
  const [user, setUser] = useState([
    { id: '1',  username: 'DJ',     email: 'dj@mail.com',       phoneNumber: '44 98765-4321',   password: 'Senha123', },
    { id: '2',  username: 'Teste',  email: 'teste@mail.com',    phoneNumber: '44 12345-6789',   password: 'Senha321', },
  ]);  

  return { user, setUser };
};