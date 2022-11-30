function getUser(email, password) {
  const DataBase = JSON.parse(window.localStorage.getItem('barber-db'));
  const Users = DataBase.Users;
  return Users.find((user) => user.email === email && password === password);
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const user = getUser(email, password);
  if (user) {
    window.localStorage.setItem("barber-user", JSON.stringify(user));
    window.location.replace("./pages/home/home.html");
  }
}
