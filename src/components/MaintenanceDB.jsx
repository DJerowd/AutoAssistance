import { useState } from 'react';

export const MaintenanceDB = () => {
  const [notes, setNotes] = useState([
    { id: '1',  name: 'Lembrete 1',   type: 'Pneus',                  isRepeat: true,  isKilometersEnabled: true,  isMonthsEnabled: true,   kilometersEnd: 100, kilometers: 80,   monthsEnd: 24, months: 5,   description: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz' },
    { id: '2',  name: 'Lembrete 2',   type: 'Filtro de Ar',           isRepeat: true,  isKilometersEnabled: true,  isMonthsEnabled: false,  kilometersEnd: 100, kilometers: 60,                               description: 'abcdefghijklmnopqrstuvwxyz' },
    { id: '3',  name: 'Lembrete 3',   type: 'Filtro de Combustível',  isRepeat: true,  isKilometersEnabled: false, isMonthsEnabled: true,                                         monthsEnd: 12, months: 6,   description: 'abcdefghijklmnopqrstuvwxyz'  },
    { id: '4',  name: 'Lembrete 4',   type: 'Fluído de Freio',        isRepeat: false, isKilometersEnabled: false, isMonthsEnabled: false,                                                                    description: 'abcdefghijklmnopqrstuvwxyz'  },
    { id: '5',  name: 'Lembrete 5',   type: 'Bateria',                isRepeat: true,  isKilometersEnabled: true,  isMonthsEnabled: true,   kilometersEnd: 100, kilometers: 1,    monthsEnd: 12, months: 1,   description: 'abcdefghijklmnopqrstuvwxyz' },
    { id: '6',  name: 'Lembrete 6',   type: 'Correia',                isRepeat: true,  isKilometersEnabled: true,  isMonthsEnabled: true,   kilometersEnd: 100, kilometers: 50,   monthsEnd: 12, months: 7,   description: 'abcdefghijklmnopqrstuvwxyz' },
    { id: '7',  name: 'Lembrete 7',   type: 'Suspensão',              isRepeat: true,  isKilometersEnabled: true,  isMonthsEnabled: true,   kilometersEnd: 100, kilometers: 100,  monthsEnd: 12, months: 4,   description: 'abcdefghijklmnopqrstuvwxyz' },
    { id: '8',  name: 'Lembrete 8',   type: 'Amortecedores',          isRepeat: true,  isKilometersEnabled: true,  isMonthsEnabled: true,   kilometersEnd: 100, kilometers: 10,   monthsEnd: 12, months: 5,   description: 'abcdefghijklmnopqrstuvwxyz' },
    { id: '9',  name: 'Lembrete 9',   type: 'Revisão',                isRepeat: true,  isKilometersEnabled: true,  isMonthsEnabled: true,   kilometersEnd: 100, kilometers: 80,   monthsEnd: 10, months: 7,   description: 'abcdefghijklmnopqrstuvwxyz' },
    { id: '10', name: 'Lembrete 10',  type: 'Troca de Óleo',          isRepeat: true,  isKilometersEnabled: true,  isMonthsEnabled: true,   kilometersEnd: 100, kilometers: 60,   monthsEnd: 12, months: 8,   description: 'abcdefghijklmnopqrstuvwxyz' },
  ]);

  return { notes, setNotes };
};