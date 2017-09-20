import { PLATFORM } from 'aurelia-pal';
import * as moment from 'moment';
import { logger } from './../logger';
import { BootstrapFormRenderer } from './../../../helpers/bootstrap-form-renderer';
import { inject, BindingEngine } from 'aurelia-framework';
import { DialogController } from "aurelia-dialog";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
import { CommentService, FakeCommentService } from '../services/comment-service';
@inject(FakeCommentService, DialogController, ValidationControllerFactory, BindingEngine)

export class CommentDetailEditCS {
  listconfig
  listLoaiCmt
  listLoaicmtlv1
  listLoaicmtlv2
  listLoaicmtlv3
  nhanVienCS
  nhanVienSO
  ttComment
  ttDanhGia
  CommentDto: any
  Disablecmblv1 = true
  Disablecmblv2 = true
  Disablecmblv3 = true
  Disableso
  Disableph
  Disablecmluucmt
  Disablenoidung
  isAdmin = true
  isEdit = true
  ListReplies
  asyncTask
  isFull
  chkdanhgia = false;
  commentControl
  validationcontroller: ValidationController;
  constructor(private CommentSrv: CommentService, private dialogcontroller: DialogController, private controllerFactory, private bindingEngine: BindingEngine) {
    PLATFORM.moduleName('./commentdetail-dialog');
    this.validationcontroller = controllerFactory.createForCurrentScope();
    this.validationcontroller.addRenderer(new BootstrapFormRenderer());

  }

  async activate(dto: any) {

    this.Disablecmblv1 = true
    logger.info('dto', dto);
    this.CommentDto = dto;
    await this.GetConfig();
    this.bindloaicmt();
    this.trangthaicmt();
    this.disableaction();
    logger.info("Disablecmblv1", this.Disablecmblv1)
    logger.info("After Disablecmblv1", this.Disablecmblv1)
  }
  save() {
    this.validationcontroller.validate().then((result) => {
      if (result.valid) {
        this.dialogcontroller.ok(this.CommentDto);
      }
    })
  }



  async  GetConfig() {
    await (this.asyncTask = Promise.all([
      this.CommentSrv.GetCommentConfig(), this.CommentSrv.GetDetailsComment(this.CommentDto.Comment.Id)
    ]).then((rec: any) => {
      this.listconfig = rec[0];
      this.listLoaiCmt = this.listconfig.ListLoaiComent.filter(x => x.ParentId == null);
      this.nhanVienCS = this.listconfig.ListNhanVienTiepNhan.filter(x => x.Phongban === "CS");
      this.nhanVienSO = this.listconfig.ListNhanVienTiepNhan.filter(x => x.Phongban === "SO");
      this.ttComment = this.listconfig.ListTrangThai.filter(x => x.LoaiTrangThai === "CM");
      this.ttDanhGia = this.listconfig.ListTrangThai.filter(x => x.LoaiTrangThai === "DG");
      this.ListReplies = rec[1].Replies;
      console.log(rec[1].Comment.LoaiHienThi)
      if (rec[1].Comment.LoaiHienThi == "DG") {
        this.chkdanhgia = true;
      }
    }))
  }



  async bindloaicmt() {
    logger.info('this.CommentDto.Comment.CM_LoaiCommentLevel2IdTEST', this.CommentDto.Comment.CM_LoaiCommentLevel2Id)
    //Binding Loaicomment when edit.
    if (this.CommentDto.Comment.CM_LoaiCommentLevel1Id == "" || this.CommentDto.Comment.CM_LoaiCommentLevel2Id == "" || this.CommentDto.Comment.CM_LoaiCommentLevel3Id == "" || this.CommentDto.Comment.CM_LoaiCommentLevel4Id == "") {
      this.Disablecmblv1 = true
      this.Disablecmblv2 = true
      this.Disablecmblv3 = true

    } else {
      this.Disablecmblv1 = false
      this.Disablecmblv2 = false
      this.Disablecmblv3 = false
      await Promise.all([
        this.loaiLv1(),
        this.loaiLv2(),
        this.loaiLv3()])
    }
  }
  async  loaiLv1() {
    if (this.CommentDto.Comment.CM_LoaiCommentLevel1Id == "" || this.CommentDto.Comment.CM_LoaiCommentLevel1Id == null) {
      this.CommentDto.Comment.CM_LoaiCommentLevel1Id = 0;
      this.Disablecmblv1 = true;
      this.Disablecmblv2 = true;
      this.Disablecmblv3 = true;
      this.listLoaicmtlv1 = [];
      this.listLoaicmtlv2 = [];
      this.listLoaicmtlv3 = [];
      logger.info("Disablecmblv3", this.Disablecmblv3)
    } else {
      this.Disablecmblv1 = false;
      this.listLoaicmtlv1 = [];
      await (this.listLoaicmtlv1 = this.listconfig.ListLoaiComent.filter(x => x.ParentId == this.CommentDto.Comment.CM_LoaiCommentLevel1Id && x.Level == 2));
    }
  }
  async  loaiLv2() {
    if (this.CommentDto.Comment.CM_LoaiCommentLevel2Id == "" || this.CommentDto.Comment.CM_LoaiCommentLevel2Id == null) {
      this.CommentDto.Comment.CM_LoaiCommentLevel2Id = 0;
      this.Disablecmblv1 = true;
      this.Disablecmblv2 = true;
      this.Disablecmblv3 = true;
      this.listLoaicmtlv1 = [];
      this.listLoaicmtlv2 = [];
      this.listLoaicmtlv3 = [];
    }
    else {
      this.Disablecmblv2 = false;
      await (this.listLoaicmtlv2 = this.listconfig.ListLoaiComent.filter(x => x.ParentId == this.CommentDto.Comment.CM_LoaiCommentLevel2Id && x.Level == 3));
    }
  }
  async  loaiLv3() {
    if (this.CommentDto.Comment.CM_LoaiCommentLevel3Id == "" || this.CommentDto.Comment.CM_LoaiCommentLevel3Id == null) {
      this.CommentDto.Comment.CM_LoaiCommentLevel3Id = 0;
      this.Disablecmblv2 = true;
      this.Disablecmblv3 = true;
      this.listLoaicmtlv3 = [];
    }
    else {
      this.Disablecmblv3 = false;
      await (this.listLoaicmtlv3 = this.listconfig.ListLoaiComent.filter(x => x.ParentId == this.CommentDto.Comment.CM_LoaiCommentLevel3Id && x.Level == 4));
    }
  }
  async  loaiLv4() {
    if (this.CommentDto.Comment.CM_LoaiCommentLevel4Id == "" || this.CommentDto.Comment.CM_LoaiCommentLevel4Id == null) {
      this.CommentDto.Comment.CM_LoaiCommentLevel4Id = 0;
      this.Disablecmblv3 = true;
      this.listLoaicmtlv3 = [];
    }
    else {
      this.Disablecmblv3 = false;
      await (this.listLoaicmtlv3 = this.listconfig.ListLoaiComent.filter(x => x.ParentId == this.CommentDto.Comment.CM_LoaiCommentLevel3Id && x.Level == 4));
    }
  }
  async trangthaicmt() {
    // comment duoc phep chuyen trang Thai hien tai cua commnent.
    if (this.CommentDto.Comment.TrangThai.Id == 1) {
      await (this.ttComment = this.ttComment.filter(x => x.Id == 1 || x.Id == 5 || x.Id == 8));
    }
    if (this.CommentDto.Comment.TrangThai.Id == 4) {

      await (this.ttComment = this.ttComment.filter(x => x.Id == 4 || x.Id == 5 || x.Id == 8 || x.Id == 2));

    }
    if (this.CommentDto.Comment.TrangThai.Id == 2) {
      await (this.ttComment = this.ttComment.filter(x => x.Id == 2 || x.Id == 5 || x.Id == 8));
    }
    if (this.CommentDto.Comment.TrangThai.Id == 5) {
      await (this.ttComment = this.ttComment.filter(x => x.Id == 5 || x.Id == 8));
    }
    logger.info('this.CommentDto.Comment.TrangThai.Id', this.CommentDto.Comment.TrangThai.Id)
  }
  UpdateComment() {
    let jsonToPost: any = {};
    jsonToPost.CommentId = this.CommentDto.Comment.Id
    jsonToPost.MaNVTiepNhan = this.CommentDto.Comment.NVCS;
    jsonToPost.PhongBanNV = "CS";
    jsonToPost.LoaiCommentLevel1 = this.CommentDto.Comment.CM_LoaiCommentLevel1Id;
    jsonToPost.LoaiCommentLevel2 = this.CommentDto.Comment.CM_LoaiCommentLevel2Id;
    jsonToPost.LoaiCommentLevel3 = this.CommentDto.Comment.CM_LoaiCommentLevel3Id;
    jsonToPost.LoaiCommentLevel4 = this.CommentDto.Comment.CM_LoaiCommentLevel4Id;
    jsonToPost.TrangThaiId = this.CommentDto.Comment.CM_TrangThaiId;
    jsonToPost.IsDG = this.chkdanhgia == true ? "T" : "F";
    console.log(JSON.stringify(jsonToPost))
    if ( (this.CommentDto.Comment.CM_LoaiCommentLevel3Id == "") || (this.CommentDto.Comment.CM_LoaiCommentLevel2Id == "")) {
      this.showError();
      return;
    } else {
      PLATFORM.global.swal({
        title: "CHI TIẾT COMMENT",
        text: `Bạn có chắc chắn muốn cập nhật thông tin comment này không`,
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Có, Cập nhật",
        cancelButtonText: "Không, hủy thao tác!",
        closeOnConfirm: false,
        closeOnCancel: false
      },
        (isConfirm) => {
          if (isConfirm) {
            this.CommentSrv.UpdateComment()
              .then(res => this.showSuccess()).then().catch(_ => this.showError());
          } else this.showCancel()
        })

    }
  }



  Editcomment(dt) {

    //this._IdCommentrpl = dt.Id;

    var date1: any = new Date(moment(this.ListReplies.NgayGioTraLoi).format("YYYY/MM/DD H:m:ss"));

    var date2: any = new Date(moment().format("YYYY/MM/DD H:m:ss")); // 5:00 PM



    if (date2 < date1) {
      date2.setDate(date2.getDate() + 1);
    }

    var diff = date2 - date1;

    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;


    if (this.isFull == true) {

      this.isEdit = false;
      this.Disableph = false;

      this.commentControl.setData(dt.NoiDung)
    } else {
      if (hh < 72) {

        this.isEdit = false;
        this.Disableph = false;
        this.commentControl.setData(dt.NoiDung)
      } else {
        this.showError();
        this.Disableph = true;
      }
    }

  }
  phanhoi() {
    var phanhoidto: any = {}
    phanhoidto.PhanHoi = true;
    // phanhoidto.CommentDto=this.CommentDto
    logger.info('phanhoidto', phanhoidto)
    this.validationcontroller.validate({ object: phanhoidto }).then((result) => {
      if (result.valid) {
        this.dialogcontroller.ok(this.CommentDto);
      }
    })
  }
  disableaction() {
    // Disable dua vao trang Thai hien tai cua commnent.
    logger.info('this.CommentDto.Comment.TrangThai.Id', this.CommentDto.Comment.TrangThai.Id)
    if (this.CommentDto.Comment.TrangThai.Id == 3 || this.CommentDto.Comment.TrangThai.Id == 5 || this.CommentDto.Comment.TrangThai.Id == 8 || this.CommentDto.Comment.TrangThai.Id == 4) {
      this.CommentDto.Comment.CM_TrangThaiId = this.CommentDto.Comment.CM_TrangThaiId;

      this.Disableso = true
      this.Disableph = false
      this.Disablecmluucmt = false
      this.Disablenoidung = false

    } else {
      this.Disableso = false
      this.Disableph = false
      this.Disablecmluucmt = false
      this.Disablenoidung = false
    }
  }
  private showSuccess() {
    PLATFORM.global.swal("Thành công", "Lưu thành công", "success");
  }
  private showError() {
    PLATFORM.global.swal("Không Thành công", "Lưu không thành công", "error");
  }
  private showCancel() {
    PLATFORM.global.swal("Đã hủy", "Đã hủy thao tác", "error");
  }
}
