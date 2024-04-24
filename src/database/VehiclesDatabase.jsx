import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('vehicles.db');

{/* Iniciar Banco de Dados */}
export const initVehiclesDB = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS vehicles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
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
            () => console.log('Tabela criada com sucesso'),
            (_, error) => console.log('Erro ao criar tabela:', error)
        );
    });
};

{/* Inserir Novo Veículo */}
export const insertVehicle = (vehicle) => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO vehicles (name, brand, model, version, color, manufactureYear, licensePlate, fuelType, transmission, engine, mileage)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [vehicle.name, vehicle.brand, vehicle.model, vehicle.version, vehicle.color, vehicle.manufactureYear, vehicle.licensePlate, vehicle.fuelType, vehicle.transmission, vehicle.engine, vehicle.mileage],
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

{/* Atualiizar Veículo */}
export const updateVehicle = (vehicle) => {
    db.transaction(tx => {
        tx.executeSql(
            `UPDATE vehicles SET name = ?, brand = ?, model = ?, version = ?, color = ?, manufactureYear = ?, licensePlate = ?, fuelType = ?, transmission = ?, engine = ?, mileage = ? WHERE id = ?;`,
            [vehicle.name, vehicle.brand, vehicle.model, vehicle.version, vehicle.color, vehicle.manufactureYear, vehicle.licensePlate, vehicle.fuelType, vehicle.transmission, vehicle.engine, vehicle.mileage, vehicle.id],
            (_, resultSet) => console.log('Veículo atualizado com sucesso:', resultSet),
            (_, error) => console.log('Erro ao atualizar veículo:', error)
        );
    });
};

{/* Deletar Veículo */}
export const deleteVehicle = (vehicleId) => {
    db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM vehicles WHERE id = ?;`,
            [vehicleId],
            (_, resultSet) => console.log('Veículo excluído com sucesso:', resultSet),
            (_, error) => console.log('Erro ao excluir veículo:', error)
        );
    });
};