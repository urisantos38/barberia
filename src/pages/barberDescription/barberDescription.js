const barberDB = JSON.parse(window.localStorage.getItem("barber-db"));
const barberSelected = JSON.parse(
  window.localStorage.getItem("barber-selected")
);

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}

function renderServices() {
  const servicesContainer = document.getElementById("services");

  barberSelected.services.forEach(service => {
    const card = document.createElement('div');
    const cardActions = document.createElement('div');
    cardActions.className = 'cardActions';
    card.className = 'serviceCard';
    const serviceName = document.createElement('h3');
    serviceName.innerText = barberDB.CatalogServices.find(serv => serv.id === service.idServicio).name;
    const servicePrice = document.createElement('p');
    servicePrice.innerText = 'El precio es de: $' + service.price;

    const addButton = document.createElement('button');
    const removeButton = document.createElement('button');
    const counter = document.createElement('p');

    addButton.className = 'buttonForm';
    addButton.innerText = 'Agregar';
    removeButton.className = 'buttonForm';
    removeButton.innerText = 'Quitar';
    const orders = JSON.parse(window.localStorage.getItem('barber-order'));
    const barberOrder = orders?.find(order => order.idBarber === barberSelected.idBarber);
    const serviceOrdered = barberOrder?.order.find(order => order.idServicio === service.idServicio);
    if (serviceOrdered) {
      counter.innerText = 'Agregados: '+serviceOrdered.counter;
    } else {
      counter.innerText = 'Agregados: 0';
    }
    counter.id = 'counter'+service.idServicio;

    addButton.onclick = () => addService(service.idServicio);
    removeButton.onclick = () => removeService(service.idServicio);

    cardActions.appendChild(addButton);
    cardActions.appendChild(removeButton);
    cardActions.appendChild(counter);

    card.appendChild(serviceName);
    card.appendChild(servicePrice);
    card.appendChild(cardActions);
    servicesContainer.appendChild(card);
  });
}

function renderValues() {
  const title = document.getElementById("barbersName");
  title.innerText = barberSelected.name;

  const days = document.getElementById("days");
  const hours = document.getElementById("hours");

  barberSelected.openTime.days.forEach((day) => {
    days.innerText += barberDB.CatalogDays[day] + ", ";
  });
  hours.innerText +=
    secondsToHms(barberSelected.openTime.open) +
    " a " +
    secondsToHms(barberSelected.openTime.close);

  renderServices();
}

function removeService(idServicio) {
  let order = JSON.parse(window.localStorage.getItem('barber-order'));
  let count = 0;
  if (order) {
    const barberOrder = order.find(barOrd => barOrd.idBarber === barberSelected.idBarber);
    if (barberOrder) {
      const service = barberOrder.order.find(servi => servi.idServicio === idServicio);
      if (service && service.counter > 0) {
        service.counter--;
        count = service.counter;
      }
    }
    window.localStorage.setItem('barber-order', JSON.stringify(order));
  }
  const updateCounter = document.getElementById('counter'+idServicio);
  updateCounter.innerText = 'Agregados: '+count;
}

function addService(idServicio) {
  let order = JSON.parse(window.localStorage.getItem('barber-order'));
  let count = 0;
  if (order) {
    const barberOrder = order.find(barOrd => barOrd.idBarber === barberSelected.idBarber);
    if (barberOrder) {
      const service = barberOrder.order.find(servi => servi.idServicio === idServicio);
      if (service) {
        service.counter++;
        count = service.counter;
      } else {
        const newOrder = {
          idServicio,
          counter: 1,
        };
        count++;
        barberOrder.order.push(newOrder);
      }
    } else {
      order.push({
        idBarber: barberSelected.idBarber,
        order: [
          {
            idServicio,
            counter: 1,
          }
        ],
      });
      count++;
    }
    window.localStorage.setItem('barber-order', JSON.stringify(order));
  } else {
    const newOrder = [{
      idBarber: barberSelected.idBarber,
      order: [
        {
          idServicio,
          counter: 1,
        }
      ],
    }];
    count++;
    window.localStorage.setItem('barber-order', JSON.stringify(newOrder));
  }
  const updateCounter = document.getElementById('counter'+idServicio);
  updateCounter.innerText = 'Agregados: '+count;
}

renderValues();
