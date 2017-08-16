/* global GM_setValue, GM_getValue */

import {Throttle} from 'lodash-decorators/throttle'; // jshint ignore:line
import urls from '../common.urls.json';
import {qsa} from './helpers';
import {options} from '../options/js/options';

export default class Controller {
    constructor(view) {
        this.view = view;

        // GM functions
        this.GM = {
            'set': GM_setValue, // jshint ignore:line
            'get': GM_getValue  // jshint ignore:line
        };

        const isOptionsPage = document.location.href.indexOf('/AntiAdblock/options/') >= 0;

        if (isOptionsPage) {
            this.setOptions();
            view.pageOptionsChangeListener(this.setOptions.bind(this));
        } else {
            this.pageRequirements(this.getOptions());
        }
    }

    pageRequirements(options) {
        if (this.pageCheckRequirements(options)) {
            this.view.checkLinks(urls);
            this.view.bindOpenItemCancel();
            this.mutationObserver();
        }
    }

    pageCheckRequirements(opt) {
        if (opt.google && document.location.host.indexOf('www.google.') === 0) {
            return true;
        } else if (opt.bing && document.location.host.indexOf('www.bing.com') === 0) {
            return true;
        } else if (opt.yahoo && document.location.host.indexOf('search.yahoo.com') === 0) {
            return true;
        } else if (opt.duckduckgo && document.location.host.indexOf('duckduckgo.com') === 0) {
            return true;
        } else if (opt.facebook && document.location.host.indexOf('www.facebook.com') === 0) {
            return true;
        } else if (opt.twitter && document.location.host.indexOf('twitter.com') === 0) {
            return true;
        } else if (opt.googlenews && document.location.host.indexOf('news.google.') === 0) {
            return true;
        } else if (opt.yahooNews && document.location.href.indexOf('https://www.yahoo.com/news/') === 0) {
            return true;
        } else if (opt.reddit && document.location.host.indexOf('www.reddit.com') === 0) {
            return true;
        } else {
            return false;
        }
    }

    mutationObserver() {
        const _this = this;

        const MutationObserver =
            window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver;

        try {
            let observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                        _this.rebuild(mutation.target.classList);
                    }
                });
            });

            let config = {
                childList: true,
                subtree: true
            };

            observer.observe(document, config);
        } catch (e) {
            console.log('MutationObserver is not available on this browser');
        }
    }

    /* jshint ignore:start */
    @Throttle(500)
    /* jshint ignore:end */
    rebuild(elClasses) {
        if (!elClasses.contains('adguard-icon') && !elClasses.contains('adguard-icon-status')) {
            this.view.checkLinks(urls);
        }
    }

    setOptions() {
        let data = localStorage.getItem('anti-adblock-store');

        if (!data) {
            data = {};
            const elements = qsa('label.option');
            elements.forEach(el => {
                data[el.id] = el.children[el.id].checked;
            });
        } else {
            data = JSON.parse(data);
        }

        this.GM.set('anti-adblock-store', data);
    }

    getOptions() {
        return this.GM.get('anti-adblock-store', options);
    }
}
