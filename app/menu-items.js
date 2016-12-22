export let MenuItems = [
    { route: 'orders', display: 'Užsakymai', permissions: ['client', 'mechanic'] },
    { route: 'bikes', display: 'Dviračiai', permissions: ['client'] },
    { route: 'mechanics', display: 'Meistrai', permissions: ['admin'] },
    { route: 'accountants', display: 'Buhalteriai', permissions: ['admin'] },
    { route: 'parts', display: 'Dalys', permissions: ['admin'] },
    { route: 'payments', display: 'Mokėjimai', permissions: ['accountant', 'client'] },
    { route: 'receipts', display: 'Sąskaitos', permissions: ['accountant', 'client'] },
    { route: 'services', display: 'Servisai', permissions: ['admin'] },
    { route: 'wages', display: 'Algų tvirtinimas', permissions: ['accountant'] },
    { route: 'clients', display: 'Klientai', permissions: ['admin'] },
    { route: 'users', display: 'Vartotojai', permissions: ['admin'] },
    { route: 'tasks', display: 'Paslaugos', permissions: ['admin'] },
    { route: 'wages-report', display: 'Algų ataskaita', permissions: ['accountant'] },
    { route: 'receipts-report', display: 'Sąskaitų ataskaita', permissions: ['accountant'] },
    { route: 'parts-report', display: 'Detalių ataskaita', permissions: ['accountant'] }
];