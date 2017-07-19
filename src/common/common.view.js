import {$on, $off, $delegate, qsa} from './common.helpers';

const ESCAPE_KEY = 27;

export default class View {
    constructor(template) {
        this.template = template;

        this.linkElements = document.querySelectorAll('a');

        $on(document, 'click', this.closeLinksStatus);

        $delegate(document, '.adguard-icon-status', 'click', ({target}) => {
            this.closeLinksStatus();
            this.openLinkStatus(target);
        }, true);


        $delegate(document, '.adguard-icon-status-close', 'click', () => {
            this.closeLinksStatus();
        }, true);
    }

    checkLinks(urls) {
        if(!this.linkElements.length) return false;

        this.linkElements.forEach((el) => {
            let href = el.getAttribute('href');

            if (href && href.length > 4) {
                let adgurad = document.createElement('div');
                let adguradIcon = document.createElement('div');
                adgurad.className = 'adguard-icon';
                adguradIcon.className = 'adguard-icon-status';
                let parent = el.parentNode;

                adgurad.appendChild(adguradIcon);

                let status = urls.data.some(this.compare.bind(this, href, adguradIcon));

                let data = {
                    title: 'Address',
                    status: status ? 'denied' : 'allowed',
                    href: href
                };

                parent.insertBefore(adgurad, el);

                this.showLinkStatus(adguradIcon, data);
            }
        });
    }

    compare(href, adguradIcon, link) {
        if (href.indexOf(link.url) > -1 && link.status === 'untrusted') {
            adguradIcon.classList.add('adguard-icon-status-not-ok');
            adguradIcon.classList.remove('adguard-icon-status-ok');

            return true;
        } else {
            adguradIcon.classList.add('adguard-icon-status-ok');
            adguradIcon.classList.remove('adguard-icon-status-not-ok');
        }
    }

    openLinkStatus(target) {
        target.classList.add('adguard-icon-status-show');
    }

    showLinkStatus(target, data) {
        $on(target, 'click', this.stopPropagation);
        target.innerHTML = this.template.linkStatus(data);
    }

    closeLinksStatus() {
        let el = qsa('.adguard-icon-status-show');

        if(el.length) {
            el.forEach((e) => {
                $off(e, 'click', this.stopPropagation);
                e.classList.remove('adguard-icon-status-show');
            });
        }
    }

    bindOpenItemCancel() {
        $on(document, 'keydown', ({keyCode}) => {
            if (keyCode === ESCAPE_KEY) {
                this.closeLinksStatus();
            }
        });
    }

    stopPropagation(e) {
        e.stopPropagation();
    }
}
