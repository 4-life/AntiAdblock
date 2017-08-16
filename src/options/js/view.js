import {qs, qsa, $delegate} from '../../common/helpers';
import {i18n} from './localization';

export default class View {
    constructor() {
        this.statusText = qs('#status');

        this.warningIconsNearLinks = qs('#warningIconsNearLinks');
        this.preventAccess = qs('#preventAccess');
        this.tryToCircumvent = qs('#tryToCircumvent');
        this.google = qs('#google');
        this.bing = qs('#bing');
        this.yahoo = qs('#yahoo');
        this.duckduckgo = qs('#duckduckgo');
        this.facebook = qs('#facebook');
        this.twitter = qs('#twitter');
        this.googlenews = qs('#googlenews');
        this.yahooNews = qs('#yahooNews');
        this.reddit = qs('#reddit');

        this.options = qs('.options');
    }

    localization() {
        // too slow select
        const elements = qsa('*[i18n]');
        elements.forEach(el => {
            el.innerText = i18n(el.getAttribute('i18n'));
        });

    }

    updateOption(handler) {
        $delegate(this.options, '.option', 'click', ({target}) => {
            let id = target.id;
            let value = target.children[id].checked;
            handler(id, value);
        });
    }

    showSaveStatus() {
        this.statusText.classList.add('active');
        setTimeout(() => {
            this.statusText.classList.remove('active');
        }, 750);
    }

    setOptions(data) {
        this.warningIconsNearLinks.querySelector('input').checked = data.warningIconsNearLinks;
        this.preventAccess.querySelector('input').checked = data.preventAccess;
        this.tryToCircumvent.querySelector('input').checked = data.tryToCircumvent;
        this.google.querySelector('input').checked = data.google;
        this.bing.querySelector('input').checked = data.bing;
        this.yahoo.querySelector('input').checked = data.yahoo;
        this.duckduckgo.querySelector('input').checked = data.duckduckgo;
        this.facebook.querySelector('input').checked = data.facebook;
        this.twitter.querySelector('input').checked = data.twitter;
        this.googlenews.querySelector('input').checked = data.googlenews;
        this.yahooNews.querySelector('input').checked = data.yahooNews;
        this.reddit.querySelector('input').checked = data.reddit;
    }

    getOptions() {
        return {
            warningIconsNearLinks: this.warningIconsNearLinks.checked,
            preventAccess: this.preventAccess.checked,
            tryToCircumvent: this.tryToCircumvent.checked,
            google: this.google.checked,
            yahoo: this.yahoo.checked,
            bing: this.bing.checked,
            duckduckgo: this.duckduckgo.checked,
            facebook: this.facebook.checked,
            twitter: this.twitter.checked,
            googlenews: this.googlenews.checked,
            yahooNews: this.yahooNews.checked,
            reddit: this.reddit.checked
        };
    }
}
