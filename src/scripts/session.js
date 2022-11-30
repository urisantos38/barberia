function getUser(email, password) {
  const DataBase = JSON.parse(window.localStorage.getItem('barber-db'));
  const Users = DataBase.Users;
  return Users.find((user) => user.email === email && password === password);
}

function hasLogin() {
  const user = JSON.parse(window.localStorage.getItem("barber-user"));
  const isOnLogin = !window.location.pathname.includes('/pages/');
  if (user && getUser(user.email, user.password)) {
    if (isOnLogin) {
      window.location.replace("./pages/home/home.html");
    }
  } else {
    window.location.replace("./index.html");
  }
}

function logout() {
  window.localStorage.removeItem('barber-user');
  window.location.replace("../../index.html");
}

hasLogin();