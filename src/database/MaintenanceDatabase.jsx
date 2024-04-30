import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('maintenances.db');

{/* Iniciar Banco de Dados */}
export const initMaintenancesDB = () => {
    return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS maintenances (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                vehicleId INTEGER,
                type TEXT,
                isRepeat BOOLEAN,
                isKilometersEnabled BOOLEAN,
                kilometers INTEGER,
                kilometersTotal INTEGER,
                isMonthsEnabled BOOLEAN,
                months INTEGER,
                monthsTotal INTEGER,
                description TEXT
            );`,
            [],
            () => console.log('Tabela de manutenção criada com sucesso'),
            (_, error) => console.log('Erro ao criar tabela de manutenção:', error)
        );
    });
});
}

{/* Inserir Novo Lembrete */}
export const insertMaintenance = (maintenance, vehicleId) => {
    db.transaction(tx => {
       tx.executeSql(
         `INSERT INTO maintenances (vehicleId, type, isRepeat, isKilometersEnabled, kilometers, kilometersTotal, isMonthsEnabled, months, monthsTotal, description)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
         [vehicleId, maintenance.type, maintenance.isRepeat, maintenance.isKilometersEnabled, maintenance.kilometers, maintenance.kilometersTotal, maintenance.isMonthsEnabled, maintenance.months, maintenance.monthsTotal, maintenance.description],
         (_, resultSet) => console.log('Manutenção inserida com sucesso:', resultSet),
         (_, error) => console.log('Erro ao inserir manutenção:', error)
       );
    });
   };


{/* Carregar Lembrete */}
export const fetchMaintenances = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM maintenances;`,
                [],
                (_, { rows: { _array } }) => resolve(_array),
                (_, error) => reject(error)
            );
        });
    });
};

{/* Carregar Lembrete por Veículo */}
export const fetchVehicleMaintenances = (vehicleId) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM maintenances WHERE vehicleId = ?;`,
                [vehicleId],
                (_, { rows: { _array } }) => resolve(_array),
                (_, error) => reject(error)
            );
        });
    });
};