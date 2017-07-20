import {qsa} from './common.helpers';

export default class Utils {
    validateUrlString(url) {
        return !!url && url.length > 4;
    }

    validateUrlIsExternal(url) {
        let host = document.location.host.replace('www.', '');
        return url.indexOf(host) === -1 && url.indexOf('//') > -1;
    }

    validateLinkIsNotEmpty(el) {
        return el.innerHTML !== '' && el.innerText !== '';
    }

    validateLinkIsNotBgImage(el) {
        return window.getComputedStyle(el, null).background.indexOf('url') === -1;
    }

    validateLinkIsNotTagImage(el) {
        return !(el.childElementCount === 1 && el.innerHTML.indexOf('img') > -1);
    }

    validateLinkAllreadyChecked(el) {
        let href = el.getAttribute('href');
        let ad = qsa('.adguard-icon', el.parentNode);
        let sts = true;
        ad.forEach((a) => {
            if(a.getAttribute('data-href') === href) {
                sts = false;
            }
        });

        return sts;
        // return ad && ad.getAttribute('data-href') !== href;
    }
}
