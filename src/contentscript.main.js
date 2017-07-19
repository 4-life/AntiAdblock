import Template from './common/common.template';
import Controller from './common/common.controller';
import View from './common/common.view';

const template = new Template();
const view = new View(template);

new Controller(view);
