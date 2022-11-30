const Barbers = [
  {
    idBarber: 0,
    name: "Uri's Barber",
    location: {
      lat: 19.72417732655271,
      lng: -98.97130734595464,
    },
    openTime: {
      days: [0,1,2,3,4,5,6],
      open: 28800, //Minutos 8 de la mañana
      close: 86400, //Minutos 8 de la noche
    },
    services: [
      {
        idServicio: 0,
        price: 140,
      },
      {
        idServicio: 1,
        price: 100,
      },
      {
        idServicio: 2,
        price: 200,
      },
    ]
  },
  {
    idBarber: 2,
    name: "Shugar's Barber",
    location: {
      lat: 19.7374293,
      lng: -98.9586235,
    },
    openTime: {
      days: [0,1,2,3,4,5],
      open: 36000, //Minutos 8 de la mañana
      close: 75600, //Minutos 8 de la noche
    },
    services: [
      {
        idServicio: 0,
        price: 150,
      },
      {
        idServicio: 2,
        price: 100,
      },
      {
        idServicio: 4,
        price: 80,
      },
    ]
  }
];

const CatalogDays = ['Lunes', 'Martes', 'Miércoles', 'Juéves', 'Viernes', 'Sábado', 'Domingo'];
const CatalogServices = [
  {
    id: 0,
    name: 'Corte Adulto',
  },
  {
    id: 1,
    name: 'Corte Niño',
  },
  {
    id: 2,
    name: 'Corte más Barba',
  },
  {
    id: 3,
    name: 'Corte Adulto más Corte Niño',
  },
  {
    id: 4,
    name: 'Mascarilla para Puntos Negros',
  },
];

const Users = [
  {
    id: 0,
    email: "urisantos39@gmail.com",
    password: "shidoris123w",
  },
];

const dataBase = {
  Barbers,
  CatalogServices,
  CatalogDays,
  Users,
};

if (!window.localStorage.getItem('barber-db') || window.location.pathname.includes('index.html')) {
  window.localStorage.setItem('barber-db', JSON.stringify(dataBase));
}
