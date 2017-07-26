import {$on, $delegate, qsa} from './common.helpers';
import Utils from './common.utils';

const ESCAPE_KEY = 27;

const utils = new Utils();

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
        this.linkElements = document.querySelectorAll('a');

        if (!this.linkElements.length) return false;

        this.linkElements.forEach((el) => {
            let href = el.getAttribute('href');

            if (this.linkCheckRequirements(el)) {
                let adguard = document.createElement('div');
                let adguradIcon = document.createElement('div');
                adguard.className = 'adguard-icon';
                adguard.setAttribute('data-href', href);
                adguradIcon.className = 'adguard-icon-status';
                let parent = el.parentNode;

                adguard.appendChild(adguradIcon);

                let status = urls.data.find(this.compare.bind(this, href, adguradIcon));

                if (status) {
                    parent.insertBefore(adguard, el.nextSibling);
                    this.showLinkStatus(adguradIcon, status);
                }
            }
        });
    }

    linkCheckRequirements(el) {
        let url = el.getAttribute('href');

        switch (false) {
            case utils.validateUrlString(url):
                return false;

            case utils.validateUrlIsExternal(url):
                return false;

            case utils.validateLinkIsNotEmpty(el):
                return false;

            case utils.validateLinkIsNotBgImage(el):
                return false;

            case utils.validateLinkIsNotTagImage(el):
                return false;

            case utils.validateLinkAlreadyChecked(el):
                return false;
            default:
                return true;
        }
    }

    compare(href, adguradIcon, link) {
        if (href.indexOf(link.domain) > -1 && link.categories.length) {
            link.categories.forEach((lvl) => {
                adguradIcon.classList.add('adguard-status-' + lvl);
            });

            return link;
        } else {
            adguradIcon.classList.add('adguard-icon-status-ok');
        }
    }

    openLinkStatus(target) {
        target.classList.add('adguard-icon-status-show');
        qsa('.adguard-icon').forEach((el) => el.style = 'z-index:0;');
        target.parentNode.style = '';
    }

    showLinkStatus(target, data) {
        $on(target, 'click', this.stopPropagation);
        target.innerHTML = this.template.linkStatus(data);
    }

    closeLinksStatus() {
        qsa('.adguard-icon').forEach((el) => el.style = '');
        qsa('.adguard-icon-status-show').forEach((e) => e.classList.remove('adguard-icon-status-show'));
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
