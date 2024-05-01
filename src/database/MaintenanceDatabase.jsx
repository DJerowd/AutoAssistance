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

{/* Atualizar Lembrete */}
export const updateMaintenance = (maintenance, vehicleId) => {
    db.transaction(tx => {
        tx.executeSql(
            `UPDATE maintenances SET type = ?, isRepeat = ?, isKilometersEnabled = ?, kilometers = ?, kilometersTotal = ?, isMonthsEnabled = ?, months = ?, monthsTotal = ?, description = ? WHERE id = ? AND vehicleId = ?;`,
            [maintenance.type, maintenance.isRepeat, maintenance.isKilometersEnabled, maintenance.kilometers, maintenance.kilometersTotal, maintenance.isMonthsEnabled, maintenance.months, maintenance.monthsTotal, maintenance.description, maintenance.id, vehicleId],
            (_, resultSet) => console.log('Lembrete atualizado com sucesso:', resultSet),
            (_, error) => console.log('Erro ao atualizar Lembrete:', error)
        );
    });
};

{/* Deletar Lembrete */}
export const deleteMaintenances = (maintenanceId, vehicleId) => {
    db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM maintenances WHERE id = ? AND vehicleId = ?;`,
            [maintenanceId, vehicleId],
            (_, resultSet) => console.log('Lembrete excluído com sucesso:', resultSet),
            (_, error) => console.log('Erro ao excluir Lembrete:', error)
        );
    });
};

{/* Resetar Banco de Dados de Usuarios */}
export const deleteAllMaintenances = () => {
    return new Promise((resolve, reject) => {
       db.transaction(tx => {
         tx.executeSql(
           `DROP TABLE maintenances;`,
           [],
           () => {
             console.log('Todos as manutenções foram apagadas com sucesso');
             resolve();
           },
           (_, error) => {
             console.log('Erro ao apagar manutenções:', error);
             reject(error);
           }
         );
       });
    });
   };