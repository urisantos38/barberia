const barberDB = JSON.parse(window.localStorage.getItem("barber-db"));
const order = JSON.parse(window.localStorage.getItem('barber-order'));

function submitReservation() {
  alert('Tu reservación se ha hecho !');
  window.localStorage.removeItem('barber-order');
}

function renderTableInfo() {
  const taboeBody = document.getElementById('reservesBodyTable');

  order?.forEach(barber => {
    barber.order.forEach(services => {
      const row = document.createElement('tr');

      const data1 = document.createElement('td');
      const data2 = document.createElement('td');
      const data3 = document.createElement('td');
      const data4 = document.createElement('td');

      data1.innerText = barberDB.Barbers.find(barb => barb.idBarber === barber.idBarber).name;
      data2.innerText = barberDB.CatalogServices.find(servi => servi.id === services.idServicio).name;
      data3.innerText = services.counter;

      const newInput = document.createElement('input');
      newInput.type = 'time';
      newInput.min = '09:00';
      newInput.max = '10:00';
      newInput.required = true;
      data4.appendChild(newInput);

      row.appendChild(data1);
      row.appendChild(data2);
      row.appendChild(data3);
      row.appendChild(data4);
      taboeBody.appendChild(row);
    });
  });
}
renderTableInfo();