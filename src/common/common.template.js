import {escapeForHTML} from './common.helpers';

import categories from '../categories.json';

export default class Template {
    linkStatus(data) {
        let text = {};
        text.threats = [];
        text.status = 'Donate';
        text.statusClass = 'allow';

        data.categories.forEach((id) => {

            if (id === 1 || id === 2 || id === 4) {
                text.status = 'Warning';
                text.statusClass = 'warning';
            }

            text.threats.push(categories[id].description);
        });

        let threats = text.threats.reduce((text, threat) => {
            return text + '<li><p>' + escapeForHTML(threat) + '</p></li>';
        }, '');

        return `<div class="adguard-icon-status-content">
            <button class="adguard-icon-status-close">×</button>
            <span>Adblock Recovery</span>
            <p class="status status-${escapeForHTML(text.statusClass)}">Status: ${escapeForHTML(text.status)}</p>
            <p>The ${escapeForHTML(data.domain)} site you are trying to navigate uses anti-blocking mechanisms:</p>
            <ul>${threats}</ul>
        </div>`;
    }
}
