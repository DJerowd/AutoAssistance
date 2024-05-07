import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('vehicles.db');

{/* Iniciar Banco de Dados */}
export const initVehiclesDB = () => {
    return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS vehicles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER,
                name TEXT,
                brand TEXT,
                model TEXT,
                version TEXT,
                color TEXT,
                manufactureYear TEXT,
                licensePlate TEXT,
                fuelType TEXT,
                transmission TEXT,
                engine TEXT,
                mileage INTEGER
            );`,
            [],
            () => console.log('Tabela de veículos criada com sucesso'),
            (_, error) => console.log('Erro ao criar tabela de veículos:', error)
        );
    });
    });
};

{/* Inserir Novo Veículo */}
export const insertVehicle = (vehicle, userId) => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO vehicles (userId, name, brand, model, version, color, manufactureYear, licensePlate, fuelType, transmission, engine, mileage)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [userId, vehicle.name, vehicle.brand, vehicle.model, vehicle.version, vehicle.color, vehicle.manufactureYear, vehicle.licensePlate, vehicle.fuelType, vehicle.transmission, vehicle.engine, vehicle.mileage],
            (_, resultSet) => console.log('Veículo inserido com sucesso:', resultSet),
            (_, error) => console.log('Erro ao inserir veículo:', error)
        );
    });
};

{/* Carregar Veículos */}
export const fetchVehicles = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM vehicles;`,
                [],
                (_, { rows: { _array } }) => resolve(_array),
                (_, error) => reject(error)
            );
        });
    });
};

{/* Carregar Veículos por Usuario */}
export const fetchUserVehicles = (userId) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM vehicles WHERE userId = ?;`,
                [userId],
                (_, { rows: { _array } }) => resolve(_array),
                (_, error) => reject(error)
            );
        });
    });
};

{/* Atualizar Veículo */}
export const updateVehicle = (vehicle, userId) => {
    db.transaction(tx => {
        tx.executeSql(
            `UPDATE vehicles SET name = ?, brand = ?, model = ?, version = ?, color = ?, manufactureYear = ?, licensePlate = ?, fuelType = ?, transmission = ?, engine = ?, mileage = ? WHERE id = ? AND userId = ?;`,
            [vehicle.name, vehicle.brand, vehicle.model, vehicle.version, vehicle.color, vehicle.manufactureYear, vehicle.licensePlate, vehicle.fuelType, vehicle.transmission, vehicle.engine, vehicle.mileage, vehicle.id, userId],
            (_, resultSet) => console.log('Veículo atualizado com sucesso:', resultSet),
            (_, error) => console.log('Erro ao atualizar veículo:', error)
        );
    });
};

{/* Deletar Veículo */}
export const deleteVehicle = (vehicleId, userId) => {
    db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM vehicles WHERE id = ? AND userId = ?;`,
            [vehicleId, userId],
            (_, resultSet) => console.log('Veículo excluído com sucesso:', resultSet),
            (_, error) => console.log('Erro ao excluir veículo:', error)
        );
    });
};

{/* Resetar Banco de Dados de Usuarios */}
export const deleteAllVehicles = () => {
    return new Promise((resolve, reject) => {
       db.transaction(tx => {
         tx.executeSql(
           `DROP TABLE vehicles;`,
           [],
           () => {
             console.log('Todos os veículos foram apagados com sucesso');
             resolve();
           },
           (_, error) => {
             console.log('Erro ao apagar veículos:', error);
             reject(error);
           }
         );
       });
    });
   };