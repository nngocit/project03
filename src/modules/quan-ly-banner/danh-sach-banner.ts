import { PLATFORM } from 'aurelia-pal';
import { InsertOrUpdateBanner } from './dialogs/banner-dialog';
import { Filter } from './../../resources/base/filter-base';
import { ViewModelBase } from './../../resources/base/viewmodel-base';
import { inject } from 'aurelia-framework';
import { BannerService, BannerServiceImpl } from './services/banner-service';
import { Banner } from "./models/banner";
import { logger } from "./logger";
import { DialogService } from "aurelia-dialog";
@inject(BannerServiceImpl, DialogService)
export class DanhSachKhachHang implements ViewModelBase<Banner> {
    users = fetch('https://api.github.com/users')
    items: Banner[];

    itemsCount: number
    selectedItem: Banner;
    selectedList: Banner[];
    filter: Filter
    asyncTask // task control waiting view

    constructor(private bannerSrv: BannerService, private dialogService: DialogService) {
        // setup default value cho filter
        this.filter = { skip: 0, limit: 10, where: {} }
    }
    async activate(params, routeConfig, navigationInstruction) {
        // 
        logger.info('activate()')
        await this.runFilter()

    }
    async paginationChanged(event) {
        logger.info('paginationChanged()')
        await this.runFilter()
    }
    async runFilter() {
        logger.info('runFilter', this.filter)
        await (this.asyncTask = Promise.all([
            this.bannerSrv.GetAll(this.filter).then(rec => this.items = rec),
            this.bannerSrv.GetCount(this.filter).then(rec => this.itemsCount = rec),
            // this.timerDo(1000) 

        ]))

    }
    timerDo(ms = 0) {
        return new Promise((resolve, reject) => { setTimeout(() => { resolve(true) }, ms) });
    }
    async runCreate() {
        //torun gan select tu dialog tra ve
        this.selectedItem = new Banner()
        this.dialogService.open({ viewModel: InsertOrUpdateBanner, model: this.selectedItem }).whenClosed((result) => {
            if (!result.wasCancelled) {
                this.selectedItem = result.output;
                this.bannerSrv.Post(this.selectedItem).then(_ => this.showSuccess()).then(rec => this.runFilter()).catch(_ => this.showError())
            } else {
                logger.info("Cancel");
            }
        });

        logger.info("runCreate()", this.selectedItem)
        //this.bannerSrv.Post(this.selectedItem)
    }
    async runUpdate(item) {
        //torun gan select tu dialog tra ve
        this.selectedItem = item
        this.dialogService.open({ viewModel: InsertOrUpdateBanner, model: this.selectedItem }).whenClosed((result) => {
            if (!result.wasCancelled) {
                this.selectedItem = result.output;
                this.bannerSrv.Put(this.selectedItem).then(_ => this.showSuccess()).then(rec => this.runFilter()).catch(_ => this.showError())
            } else {
                logger.info("Cancel");
            }
        });
        logger.info("runUpdate()", this.selectedItem)
    }
    async runDelete(item) {
        this.selectedItem = item
        PLATFORM.global.swal({
            title: "Bạn có chắc xóa không",
            text: "Bạn sẽ không khôi phục lại được nhân viên nếu đã bị xóa",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Có, Xóa",
            cancelButtonText: "Không, hủy thao tác!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            (isConfirm) => {
                if (isConfirm) {
                    this.bannerSrv.Delete(this.selectedItem.ID)
                        .then(res => this.showSuccess()).then(_ => this.runFilter()).catch(_ => this.showError());
                } else this.showCancel()
            })
        logger.info("runDelete()", this.selectedItem)
    }
    async runDeleteMany() {
        let deletedIds = this.selectedList.map(x => x.ID);
        logger.info("runDeleteList()", this.selectedList)
        await this.bannerSrv.DeleteMany(deletedIds)

    }
    private showSuccess() {
        PLATFORM.global.swal("Thành công", "Lưu thành công", "success");
    }
    private showError() {
        PLATFORM.global.swal("Thành công", "Lưu thành công", "success");
    }
    private showCancel() {
        PLATFORM.global.swal("Đã hủy", "Đã hủy thao tác", "error");
    }
}
