import { useState } from 'react';

export const MaintenanceDB = () => {
  const [notes, setNotes] = useState([
    { id: '1',  name: 'Lembrete 1',   type: 'Pneus',                  isRepeat: true,  isKilometersEnabled: true,  isMonthsEnabled: true,   kilometersEnd: 30000, kilometers: 8000,   monthsEnd: 24,  months: 5,  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur congue dolor ut porttitor. Pellentesque commodo porta nulla, id laoreet mauris faucibus in. Integer ac pharetra enim. Suspendisse quam lacus, dictum ut iaculis id, rhoncus vel quam. Nullam in erat auctor, vehicula quam at, laoreet sem. Cras maximus faucibus nisl sed vehicula. Curabitur justo nulla, condimentum condimentum condimentum sit amet, congue vitae nisi. Fusce viverra magna eget dui mollis, ut varius orci congue. Aliquam fermentum mi vel suscipit convallis. ' },
    { id: '2',  name: 'Lembrete 2',   type: 'Troca de Óleo',          isRepeat: true,  isKilometersEnabled: true,  isMonthsEnabled: true,   kilometersEnd: 10000, kilometers: 6000,   monthsEnd: 6,   months: 3,  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: '3',  name: 'Lembrete 3',   type: 'Bateria',                isRepeat: true,  isKilometersEnabled: true,  isMonthsEnabled: true,   kilometersEnd: 10000, kilometers: 8000,   monthsEnd: 12,  months: 9,  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: '4',  name: 'Lembrete 4',   type: 'Correia',                isRepeat: true,  isKilometersEnabled: true,  isMonthsEnabled: true,   kilometersEnd: 10000, kilometers: 6000,   monthsEnd: 12,  months: 7,  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: '5',  name: 'Lembrete 5',   type: 'Suspensão',              isRepeat: true,  isKilometersEnabled: true,  isMonthsEnabled: true,   kilometersEnd: 10000, kilometers: 3000,   monthsEnd: 12,  months: 4,  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: '6',  name: 'Lembrete 6',   type: 'Amortecedores',          isRepeat: true,  isKilometersEnabled: true,  isMonthsEnabled: true,   kilometersEnd: 10000, kilometers: 10000,  monthsEnd: 12,  months: 11, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: '7',  name: 'Lembrete 7',   type: 'Revisão',                isRepeat: true,  isKilometersEnabled: true,  isMonthsEnabled: true,   kilometersEnd: 10000, kilometers: 9000,   monthsEnd: 6,   months: 6,  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: '8',  name: 'Lembrete 8',   type: 'Fluído de Freio',        isRepeat: false, isKilometersEnabled: false, isMonthsEnabled: false,                                                                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: '9',  name: 'Lembrete 9',   type: 'Filtro de Ar',           isRepeat: true,  isKilometersEnabled: true,  isMonthsEnabled: false,  kilometersEnd: 10000, kilometers: 9000,                               description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: '10', name: 'Lembrete 10',  type: 'Filtro de Combustível',  isRepeat: true,  isKilometersEnabled: false, isMonthsEnabled: true,                                             monthsEnd: 12,  months: 6,  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  ]);

  return { notes, setNotes };
};