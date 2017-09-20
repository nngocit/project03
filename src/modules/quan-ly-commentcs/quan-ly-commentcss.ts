import { CommentDetailEditCS } from './dialogs/commentdetail-dialog';
import { Filter } from './../../resources/base/filter-base';
import { ViewModelBase } from './../../resources/base/viewmodel-base';
import { inject, BindingEngine } from 'aurelia-framework';
import { CommentService, FakeCommentService } from './services/comment-service';
import { Comment, CommentDetail } from "./models/comment";
import { logger } from "./logger";
import { DialogService } from "aurelia-dialog";
import * as _ from 'lodash';
@inject(FakeCommentService, DialogService, BindingEngine)
export class DanhSachComment implements ViewModelBase<any> {
    items: Comment[];
    selectedList: Comment[];
    listconfig
    listLoaiCmt
    listLoaicmtlv1
    listLoaicmtlv2
    nhanVienCS
    nhanVienSO
    ttComment
    ttDanhGia
    Listitems
    itemsCount: number
    selectedItem: CommentDetail;

    disablecmblv1 = true;
    disablecmblv2 = true;
    filter: Filter = { skip: 0, limit: 10, where: {} };
    asyncTask // task control waiting view

    constructor(private CommentSrv: CommentService, private dialogService: DialogService, private bindingEngine: BindingEngine) {

        let loaicmt = this.bindingEngine.propertyObserver(this.filter.where, 'loaicmt')
            .subscribe(() => {
                logger.debug('this.filter.where.loaicmtlv1', this.filter.where.loaicmtlv1)
                this.CheckConditioncb();
            });
        let loaicmtlv1 = this.bindingEngine.propertyObserver(this.filter.where, 'loaicmtlv1')
            .subscribe(() => {
                this.CheckConditioncb1();
            });
    }
    async activate(params, routeConfig, navigationInstruction) {
        await this.GetConfig();
        //  await this.runFilter()
    }
    async paginationChanged(event) {
        await this.runFilter()
    }
    async runFilter() {
        logger.info('runFilter', JSON.stringify(this.filter))
        await (this.asyncTask = Promise.all([
            this.CommentSrv.CommentSearchVer2(this.filter).then((rec: any) => {
                console.log(JSON.stringify(rec))
                this.Listitems = rec.ListComments;
                this.itemsCount = rec.TotalItem
               
            })]))

    }
    async  GetConfig() {
        await (this.asyncTask = Promise.all([
            this.CommentSrv.GetCommentConfig().then(rec => {
                this.listconfig = rec;
                this.listLoaiCmt = this.listconfig.ListLoaiComent.filter(x => x.ParentId == null);
                this.nhanVienCS = this.listconfig.ListNhanVienTiepNhan.filter(x => x.Phongban === "CS");
                this.nhanVienSO = this.listconfig.ListNhanVienTiepNhan.filter(x => x.Phongban === "SO");
                this.ttComment = this.listconfig.ListTrangThai.filter(x => x.LoaiTrangThai === "CM");
                this.ttDanhGia = this.listconfig.ListTrangThai.filter(x => x.LoaiTrangThai === "DG");
            }),
        ]))
    }



    timerDo(ms = 0) {
        return new Promise((resolve, reject) => { setTimeout(() => { resolve(true) }, ms) });
    }

    runUpdate(items) {
        //torun gan select tu dialog tra ve
        this.selectedItem = items;
        this.dialogService.open({ viewModel: CommentDetailEditCS, model: this.selectedItem }).whenClosed((result) => {
           if (!result.wasCancelled) {
                this.selectedItem = result.output;
            logger.info("runUpdateoutput()", JSON.stringify(result))
                // this.CommentSrv.Put(this.selectedItem).then(_ => this.showSuccess()).then(rec => this.runFilter()).catch(_ => this.showError())
            } else {
                logger.info("Cancel");
            }
        });
        logger.info("runUpdate()", JSON.stringify(this.selectedItem))
    }
    runDelete() {
        throw new Error("Method not implemented.");
    }
    runDeleteMany() {
        throw new Error("Method not implemented.");
    }
    runCreate() {
        throw new Error("Method not implemented.");
    }

    async  loaiLv1() {
        this.listLoaicmtlv1 = [];
        await (this.listLoaicmtlv1 = this.listconfig.ListLoaiComent.filter(x => x.ParentId == this.filter.where.loaicmt && x.Level == 2));

    }
    async  loaiLv2() {
        this.listLoaicmtlv2 = [];
        await (this.listLoaicmtlv2 = this.listconfig.ListLoaiComent.filter(x => x.ParentId == this.filter.where.loaicmtlv1 && x.Level == 3));

    }

}

export class FormatCommentforLengthValueConverter {
    toView(cmt) {
        let tmp = "";
        tmp = _.truncate(cmt.trim(), {
            'length': 80,
            'separator': /,? +/
        });
        return tmp;
    }
}
export class FormatLoaicmtValueConverter {
    toView(lv1, lv2, lv3, lv4, lv5) {
        if (lv1 == null) {
            return "Chưa phân loại";
        } else
            if (lv5 == null) {
                return lv2 + '-' + lv3 + '-' + lv4;
            }
        return lv2 + '-' + lv3 + '-' + lv4 + '-' + lv5;
    }
}
export class FilterByTrangThaiCommentValueConverter {
    toView(array, tt) {

        if (tt != "" && tt != null && typeof tt !== "undefined") {
            return array.filter(x => x.CM_NVQuanLyDanhGiaId == tt);
        } else {
            return array;
        }

    }


}