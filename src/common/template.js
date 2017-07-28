import {escapeForHTML} from './helpers';

import categories from '../categories.json';

import {i18n} from './localization';

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
            return text + '<li><p>' + i18n(escapeForHTML(threat)) + '</p></li>';
        }, '');

        return `<div class="adguard-icon-status-content">
            <button class="adguard-icon-status-close">×</button>
            <span class="adguard-status-recovery">${i18n('adblock_recovery')}</span>
            <p class="status status-${escapeForHTML(text.statusClass)}">
                ${i18n('status')}: ${escapeForHTML(text.status)}</p>
            <p>${escapeForHTML(data.domain)} ${i18n('mechanisms')}:</p>
            <ul class="status-icon status-icon-${escapeForHTML(text.statusClass)}">${threats}</ul>
        </div>`;
    }
}
