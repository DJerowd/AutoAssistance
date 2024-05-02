import { useState } from 'react';

export const UsersDB = () => {
  const [user, setUser] = useState([
    { id: '1',  username: 'Teste',              email: 'teste@mail.com',              phoneNumber: '44 98765-4321',   password: 'Senha123', },
    { id: '2',  username: 'DJerowd',            email: 'djerowd@mail.com',            phoneNumber: '44 12345-6789',   password: 'Senha123', },
    { id: '3',  username: 'Usuario0123456789',  email: 'usuario0123456789@mail.com',  phoneNumber: '44 99999-9999',   password: 'Senha123', },
    { id: '2',  username: 'Usuário',            email: 'usuario@email.com',           phoneNumber: '44 98765-4321',   password: 'Senha123', },
  ]);  

  return { user, setUser };
};