import { PLATFORM } from 'aurelia-pal';
import { childViewer } from './../../helpers/child-viewer';
import { inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { Router, RouterConfiguration } from 'aurelia-router';
import { logger } from "./logger";
// @inlineView(childViewer)
export class QuanLyNhanVien {
    router: Router;
    heading = 'Quản lý Banner';
    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ['', 'danh-sach-banner'], name: 'danh-sach-banner', moduleId: PLATFORM.moduleName('./danh-sach-banner'), nav: true, title: 'Danh sách banner' }]);
        this.router = router;
        logger.debug('router', this.router)
    }
}