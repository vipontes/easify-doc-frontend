export default class LocalStorageService {
  static setUserData(data) {
    localStorage.setItem("login", JSON.stringify(data));
  }

  static getUserData() {
    var data = localStorage.getItem("login");
    return JSON.parse(data);
  }
}
