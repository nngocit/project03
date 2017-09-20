
export class Comment {
    CommentId: String;
    TenSanPham: String;
    NguoiComment: String;
    LoaiCommentLevel1: String;
    LoaiCommentLevel2: String;
    LoaiCommentLevel3: String;
    maNVCSTiepNhan: String;
    maNVSOTiepNhan: String;
    ngayBatDau: Date;
    ngayKetThuc: Date;
    trangThaiCM: String;
    trangThaiDG: String;
    phongBan: String;
    pageNo: number;
    constructor(dto?) {
      
    }
    
       
}

export class ListComment {
    Comment: any
    DiemDanhGia: number;
    MaNVQuanLy_VTA: string;
    CM_NVQuanLyDanhGiaId: string;
    NgayGioDanhGia: String;
    NgayGioTraLoi: String;
    MaNVCSTiepNhan: String;
    TenNVCSTiepNhan: String;
    CM_NVCSTiepNhanId: String;
    MaNVSOTiepNhan: String;
    TenNVSOTiepNhan: String;
    CM_NVSOTiepNhanId: String;
}
export class CommentDetail {
    Id: number;
    CM_TrangThaiId: number;
    CM_ThongTinKhachHangId: String;
    CM_LoaiCommentLevel1Id: String;
    CM_LoaiCommentLevel2Id: String;
    CM_LoaiCommentLevel3Id: String;
    CM_LoaiCommentLevel4Id: String;
    LoaiHienThi:String;
    NgayGioTao:String;
    SP_MaSP:Number;
    SP_URL:String;
    ThongTinKhachHang:any

}