import { useState } from 'react';

export const VehiclesDB = () => {
  const [vehicles, setVehicles] = useState([
    { id: '1',  name: 'Carro 1',  brand: 'Peugeot',     model: '208',     version: 'Griffe',          color: 'Marrom',    manufactureYear: '2018', licensePlate: 'ABC1D23', fuelType: 'Flex',     transmission: 'Automatico', engine: '1.6', mileage: 120500 },
    { id: '2',  name: 'Carro 2',  brand: 'Fiat',        model: 'Argo',    version: 'Trekking',        color: 'Amarelo',   manufactureYear: '2023', licensePlate: 'EFG4H56', fuelType: 'Flex',     transmission: 'CVT',        engine: '1.3', mileage: 20025 },
    { id: '3',  name: 'Carro 3',  brand: 'Volkswagen',  model: 'Polo',    version: 'TSI GTS',         color: 'Cinza',     manufactureYear: '2024', licensePlate: 'IJK7L89', fuelType: 'Flex',     transmission: 'Automatico', engine: '1.4', mileage: 9010 },
    { id: '4',  name: 'Carro 4',  brand: 'Ford',        model: 'Fiesta',  version: 'Titanium Plus',   color: 'Azul',      manufactureYear: '2019', licensePlate: 'MNO0P12', fuelType: 'Gasolina', transmission: 'Automatico', engine: '1.6', mileage: 15250 },
    { id: '5',  name: 'Carro 5',  brand: 'Renault',     model: 'Kwid',    version: 'Intense',         color: 'Preto',     manufactureYear: '2018', licensePlate: 'QRS3T45', fuelType: 'Flex',     transmission: 'Manual',     engine: '1.0', mileage: 136000 },
    { id: '6',  name: 'Carro 6',  brand: 'Chevrolet',   model: 'Onix',    version: 'LT',              color: 'Branco',    manufactureYear: '2019', licensePlate: 'UVW6X78', fuelType: 'Flex',     transmission: 'Manual',     engine: '1.4', mileage: 110680 },
    { id: '7',  name: 'Carro 7',  brand: 'Citroen',     model: 'C3',      version: 'Origine',         color: 'Vermelho',  manufactureYear: '2015', licensePlate: 'YZA9B01', fuelType: 'Flex',     transmission: 'Manual',     engine: '1.5', mileage: 174099 },
    { id: '8',  name: 'Carro 8',  brand: 'Nissan',      model: 'March',   version: 'SV',              color: 'Laranja',   manufactureYear: '2020', licensePlate: 'CDE2F34', fuelType: 'Flex',     transmission: 'Manual',     engine: '1.6', mileage: 88001 },
    { id: '9',  name: 'Carro 9',  brand: 'Hyunday',     model: 'HB20',    version: 'T-GDI Comfort',   color: 'Prata',     manufactureYear: '2024', licensePlate: 'GHI5J67', fuelType: 'Flex',     transmission: 'Automatico', engine: '1.0', mileage: 1200 },
    { id: '10', name: 'Carro 10', brand: 'Honda',       model: 'Fit',     version: 'LX',              color: 'Verde',     manufactureYear: '2021', licensePlate: 'KLM8N90', fuelType: 'Flex',     transmission: 'CVT',        engine: '1.5', mileage: 30045 },
  ]);  

  return { vehicles, setVehicles };
};