import {escapeForHTML} from './common.helpers';

export default class Template {
    linkStatus(data) {
        data.status === 'allowed' ? data.statusText = 'No known threats' : data.statusText = 'There are threats';
        return `<div class="adguard-icon-status-content">
            <button class="adguard-icon-status-close">×</button>
            <p>${escapeForHTML(data.title)}<br/><i>${escapeForHTML(data.href)}</i></p>
            <p><span class="adguard-icon-status-${escapeForHTML(data.status)}"></span>${escapeForHTML(data.statusText)}</p>
        </div>`;
    }
}
