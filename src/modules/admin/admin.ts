import { AuthenService } from './../../authen/authenService';
import { PLATFORM } from 'aurelia-pal';

import { inject } from 'aurelia-dependency-injection';
import { Aurelia } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import "../../helpers/loggingSetting";
// import "../../helpers/axiosInterceptor";
@inject(AuthenService, Router)
export class App {
    router: Router;
    userInfo: any;
    constructor(private authenSrv: AuthenService) {
        this.userInfo = this.authenSrv.userInfo;

    }
    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia';
        config.map([
            {
                route: ['', 'dashboard'], name: 'dashboard', moduleId: PLATFORM.moduleName('../dashboard/index'), nav: true, title: 'Dashboard',
                settings: { icon: 'pg-home' }
            },
            {
                route: 'danh-sach-banner', name: 'danh-sach-banner', moduleId: PLATFORM.moduleName('../quan-ly-banner/index'), nav: true, title: 'Quản lý Banner',
                settings: { icon: 'pg-tables' }
            },
             {
                route: 'quan-ly-commentcs', name: 'quan-ly-commentcs', moduleId: PLATFORM.moduleName('../quan-ly-commentcs/index'), nav: true, title: 'Quản lý CommentCS',
                settings: { icon: 'pg-tables' }
            }


        ]);

        this.router = router;

    }
    // attached() {
    //     var script = document.createElement("script");
    //     script.src = "assets/js/scripts.js";
    //     script.type = "text/javascript";
    //     document.getElementsByTagName("head")[0].appendChild(script);
    // }
}
