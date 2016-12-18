export let MenuItems = [
    { route: 'orders', display: 'Užsakymai', permissions: ['client', 'mechanic'] },
    { route: 'bikes', display: 'Dviračiai', permissions: ['client'] },
    { route: 'cities', display: 'Miestai', permissions: ['admin'] },
    { route: 'mechanics', display: 'Meistrai', permissions: ['admin'] },
    { route: 'parts', display: 'Dalys', permissions: ['admin'] },
    { route: 'payments', display: 'Mokėjimai', permissions: ['accountant', 'client'] },
    { route: 'receipts', display: 'Sąskaitos', permissions: ['accountant', 'client'] },
    { route: 'services', display: 'Servisai', permissions: ['admin'] },
    { route: 'wages', display: 'Algos', permissions: ['accountant'] },
    { route: 'clients', display: 'Klientai', permissions: ['admin'] },
    { route: 'users', display: 'Vartotojai', permissions: ['admin'] },
    { route: 'tasks', display: 'Paslaugos', permissions: ['admin'] }
];