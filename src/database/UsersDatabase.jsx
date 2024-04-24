import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('users.db');

{/* Iniciar Banco de Dados */}
export const initUsersDB = () => {
  return new Promise((resolve, reject) => {
  db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT,
          email TEXT UNIQUE,
          phoneNumber TEXT,
          password TEXT
        );`,
        [],
        () => console.log('Tabela criada com sucesso'),
        (_, error) => console.log('Erro ao criar tabela:', error)
      );
  });
  });
};


{/* Inserir Novo Registro */}
export const insertUser = (username, email, phoneNumber, password) => {
  return new Promise((resolve, reject) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO users (username, email, phoneNumber, password) 
      VALUES (?, ?, ?, ?);`,
      [username, email, phoneNumber, password],
      (_, resultSet) => console.log('Usuário inserido com sucesso:', resultSet),
      (_, error) => console.log('Erro ao inserir usuário:', error)
    );
  });
  });
};

{/* Encontrar Usuario por E-mail */}
export const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
     db.transaction(tx => {
       tx.executeSql(
         `SELECT * FROM users WHERE email = ?;`,
         [email],
         (_, resultSet) => resolve(resultSet),
         (_, error) => reject(error)
       );
     });
  });
 };

{/* Carregar Usuarios */}
// export const fetchUsers = () => {
//   return new Promise((resolve, reject) => {
//       db.transaction(tx => {
//           tx.executeSql(
//               `SELECT * FROM users;`,
//               [],
//               (_, { rows: { _array } }) => resolve(_array),
//               (_, error) => reject(error)
//           );
//       });
//   });
// };
 


   