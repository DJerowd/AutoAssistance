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
        () => console.log('Tabela de usuários criada com sucesso'),
        (_, error) => console.log('Erro ao criar tabela de usuários:', error)
      );
  });
  });
};


{/* Inserir Novo Registro */}
export const insertUser = (user) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO users (username, email, phoneNumber, password) 
      VALUES (?, ?, ?, ?);`,
      [user.username, user.email, user.phoneNumber, user.password],
      (_, resultSet) => console.log('Usuário inserido com sucesso:', resultSet),
      (_, error) => console.log('Erro ao inserir usuário:', error)
    );
  });
};

{/* Carregar Usuarios */}
export const fetchUsers = () => {
  return new Promise((resolve, reject) => {
      db.transaction(tx => {
          tx.executeSql(
              `SELECT * FROM users;`,
              [],
              (_, { rows: { _array } }) => resolve(_array),
              (_, error) => reject(error)
          );
      });
  });
};

{/* Resetar Banco de Dados de Usuarios */}
export const deleteAllUsers = () => {
  return new Promise((resolve, reject) => {
     db.transaction(tx => {
       tx.executeSql(
         `DROP TABLE users;`,
         [],
         () => {
           console.log('Todos os usuários foram apagados com sucesso');
           resolve();
         },
         (_, error) => {
           console.log('Erro ao apagar usuários:', error);
           reject(error);
         }
       );
     });
  });
 };


   