function initMap() {
  const DataBase = JSON.parse(window.localStorage.getItem('barber-db'));
  const Barbers = DataBase.Barbers;
  const coord = { lat: 19.72417732655271, lng: -98.97130734595464 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: coord,
  });
  Barbers.forEach(barber => {
    const marker = new google.maps.Marker({
      position: barber.location,
      icon: '../../assets/marker.png',
      map: map,
    });
    google.maps.event.addListener(marker, 'click', function() {
      window.localStorage.setItem('barber-selected', JSON.stringify(barber));
      window.location.href = '../barberDescription/barberDescription.html';
    });
  });
}