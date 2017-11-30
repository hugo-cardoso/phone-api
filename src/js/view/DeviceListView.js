import $ from 'jquery';

export default class DeviceListView {
  constructor(elem) {
    this.elem = $(elem);
  }

  update(model) {
    this.elem.html(DeviceListView.template(model));
  }

  static template(model) {
    return `
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
        ${model.map(item => `
            <tr>
              <td>${item.Name}</td>
              <td>${item.Brand}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
}
