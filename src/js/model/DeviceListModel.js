export default class DeviceListModel {
  constructor() {
    this.list = [];
  }

  addDevice(device) {
    this.list.push(device);
  }

  get List() {
    return this.list;
  }
}
