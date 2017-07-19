import urls from '../common.urls.json';

export default class Controller {
    constructor(view) {
        this.view = view;

        view.checkLinks(urls);

        view.bindOpenItemCancel(this.openItemCancel.bind(this));
    }

    // TODO: check after canceled
    openItemCancel(data) {
        console.log(data);
    }
}
