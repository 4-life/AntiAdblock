/* global chrome */

import {options} from './options';

export default class Store {
    constructor(name, callback) {
        const localStorage = window.localStorage;

        this.getLocalStorage = () => {
            const data = localStorage.getItem(name);

            if (data) {
                return JSON.parse(data);
            } else {
                return options;
            }
        };

        this.setLocalStorage = (data) => {
            localStorage.setItem(name, JSON.stringify(data));
        };

        if (callback) {
            callback();
        }
    }

    getOptions(callback) {
        callback(this.getLocalStorage());
    }

    update(options, callback) {
        this.setLocalStorage(options);

        if (callback) {
            callback();
        }
    }

    updateOption(option, value, callback) {
        const options = this.getLocalStorage();

        options[option] = !value;

        this.setLocalStorage(options);

        if (callback) {
            callback(options);
        }
    }

    chromeStorageSet(data) {
        chrome.storage.sync.set(data, function() {
            console.log('saved');
        });
    }

    chromeStorageGet() {
        chrome.storage.sync.get(options, function(items) {
            this.warningIconsNearLinks.checked = items.warningIconsNearLinks;
            this.preventAccess.checked = items.preventAccess;
            this.tryToCircumvent.checked = items.tryToCircumvent;
            this.google.checked = items.google;
            this.bing.checked = items.bing;
            this.yahoo.checked = items.yahoo;
            this.duckduckgo.checked = items.duckduckgo;
            this.facebook.checked = items.facebook;
            this.twitter.checked = items.twitter;
            this.googlenews.checked = items.googlenews;
            this.yahooNews.checked = items.yahooNews;
            this.reddit.checked = items.reddit;
        });
    }
}
