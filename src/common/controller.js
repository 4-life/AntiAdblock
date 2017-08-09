import urls from '../common.urls.json';

import {Throttle} from 'lodash-decorators/throttle'

export default class Controller {
    constructor(view) {
        this.view = view;

        view.checkLinks(urls);

        view.bindOpenItemCancel(this.openItemCancel.bind(this));

        let target = document;

        const _this = this;

        const MutationObserver =
            window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver;

        try {
            let observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if(mutation.type === 'childList') {
                        _this.rebuild(mutation.target.classList);
                    }
                });
            });

            let config = { childList: true, subtree: true };

            observer.observe(target, config);
        } catch (e) {
            console.log('MutationObserver is not available on this browser');
        }
    }

    // TODO: check after canceled
    openItemCancel(data) {
        console.log(data);
    }

    @Throttle(500)
    rebuild(elClasses) {
        if(!elClasses.contains('adguard-icon') && !elClasses.contains('adguard-icon-status')) {
            this.view.checkLinks(urls);
        }
    }
}
