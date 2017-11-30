import $ from 'jquery';

export default class AppService {
  constructor() {
    this.url = location.protocol === "http" ? 'http://localhost:8080' : 'https://phones-api.herokuapp.com';
  }

  getDevices() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.url}/devices`,
        method: 'GET',
      }).done((res) => {
        resolve(res);
      }).fail(() => {
        reject(new Error('Erro'));
      });
    });
  }

  addDevice(data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.url}/addDevice`,
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
      }).done((res) => {
        console.log(res);
      }).fail(() => {
        reject(new Error('Erro'));
      });
    });
  }
}
