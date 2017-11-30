import $ from 'jquery';

import AppService from '../service/AppService';
import DeviceModel from '../model/DeviceModel';
import DeviceListView from '../view/DeviceListView';
import DeviceListModel from '../model/DeviceListModel';

export default class AppController {
  constructor() {
    this.appService = new AppService();
    this.deviceListView = new DeviceListView('#tableContent');
    this.deviceListModel = new DeviceListModel();
    this.init();
  }

  init() {
    $('#addDeviceForm').submit((event) => {
      event.preventDefault();
      this.addDevice();
    });

    this.getDevices();
  }

  addDevice() {
    this.appService.addDevice(AppController.getDeviceForm()).then((res) => {
      this.getDevices();
    }).catch((err) => {
      console.log(err);
    });
  }

  getDevices() {
    this.appService.getDevices().then((res) => {
      res.forEach((item) => {
        this.deviceListModel.addDevice(new DeviceModel(item));
      })
      this.deviceListView.update(this.deviceListModel.List);
    }).catch((err) => {
      console.log(err);
    });
  }

  static getDeviceForm() {
    const form = document.querySelector('#addDeviceForm');

    return {
      brand: form.devicebrand.value,
      name: form.deviceName.value,
      size: form.deviceSize.value,
      weight: form.deviceWeight.value,
      network: {
        gsm: form.deviceGsm.value,
        dualSim: AppController.checkTrueOrFalse(form.deviceDualSim.value),
        wifi: AppController.checkTrueOrFalse(form.deviceWifi.value),
        bluetooth: form.deviceBluetooth.value,
        usb: form.deviceUsb.value,
        nfc: AppController.checkTrueOrFalse(form.deviceNfc.value),
        gps: form.deviceGps.value,
        radio: AppController.checkTrueOrFalse(form.deviceRadio.value),
        tv: AppController.checkTrueOrFalse(form.devicetv.value),
        mobile_data: {
          types: form.deviceDataType.value,
          down_max: form.deviceDataDown.value,
          up_max: form.deviceDataUp.value,
        },
      },
      sensors: {
        acelerometer: AppController.checkTrueOrFalse(form.deviceAcelerometer.value),
        proximity: AppController.checkTrueOrFalse(form.deviceProximity.value),
        giroscope: AppController.checkTrueOrFalse(form.deviceGiroscope.value),
        compass: AppController.checkTrueOrFalse(form.deviceCompass.value),
      },
      battery: {
        type: form.deviceBatteryType.value,
        amp: form.deviceBatteryAmp.value,
      },
    };
  }

  static checkTrueOrFalse(data) {
    return data === 'yes';
  }
}
