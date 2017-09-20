import { PLATFORM } from 'aurelia-pal';
import { childViewer } from './../../helpers/child-viewer';
import { inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { Router, RouterConfiguration } from 'aurelia-router';
import { logger } from "./logger";
@inlineView(childViewer)
export class QuanLyNhanVien {
    router: Router;
    heading = 'Quản lý CommentCS';
    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ['', 'quan-ly-commentcss'], name: 'quan-ly-commentcss', moduleId: PLATFORM.moduleName('./quan-ly-commentcss'), nav: true, title: 'Danh sách Comment' }]);
        this.router = router;
        logger.debug('router', this.router)
    }
}