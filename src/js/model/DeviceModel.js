export default class DeviceModel {
  constructor(device) {
    this.name = device.name;
    this.brand = device.brand;
  }

  get Name() {
    return this.name;
  }

  get Brand() {
    return this.brand;
  }
}
