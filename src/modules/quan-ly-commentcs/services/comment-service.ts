import { Filter } from './../../../resources/base/filter-base';
import { BaseService } from './../../../resources/base/service-base';
import { Comment } from "../models/comment"
import axios from 'axios';
import { AppSetting } from '../../../appsettings/index'
export interface CommentService extends BaseService<Comment> {
    GetCommentConfig(): Promise<Array<any>>;
    GetDetailsComment(id:any): Promise<Array<any>>;
    CommentSearchVer2(filter?: Filter): Promise<Array<any>>;
    UpdateComment(obj?:any):Promise<any>;
}
export class CommentServiceImpl implements CommentService {
    UpdateComment(obj?:any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetDetailsComment(): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
    CommentSearchVer2(): Promise<any[]> {
        throw new Error("Method not implemented.");
    }


    async  GetCommentConfig(): Promise<any[]> { // Get allconfig comment
        let rec = await axios.get('/comments/configs', {
            baseURL: AppSetting.apiEndPointComment
        })
        return rec.data
    }
    GetAll(filter?: Filter): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetCount(filter?: Filter): Promise<number> {
        throw new Error("Method not implemented.");
    }
    Get(id: number): Promise<Comment> {
        throw new Error("Method not implemented.");
    }
    Post(T: Comment): Promise<Comment> {
        throw new Error("Method not implemented.");
    }
    Put(T: Comment): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    Delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    DeleteMany(Ids: number[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    ApproveList(Ids: number[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    // async GetCount(filter?: Filter): Promise<number> {
    //     let rec = await axios.get('api/Banners/count', {
    //         params: filter.where
    //     })
    //     return rec.data
    // }
    // async GetAll(filter?: Filter): Promise<any> {
    //     let recBanners = await axios.get('api/Banners', {
    //         params: filter
    //     })
    //     return recBanners.data
    // }

}
export class FakeCommentService implements CommentService {
    UpdateComment(obj?:any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async  GetDetailsComment(Id: any): Promise<any[]> {
   
        let rec = await axios.get('/comments/detailv2/'+Id, {
            baseURL: AppSetting.apiEndPointComment
            
        })
      
        return rec.data
    }

 async   GetCommentConfig(): Promise<any[]> {
        let rec = await axios.get('/comments/configs', {
            baseURL: AppSetting.apiEndPointComment
        })
        return rec.data
    }
    Get(id: number): Promise<Comment> {
        throw new Error("Method not implemented.");
    }
    GetAll(filter?: Filter): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetCount(filter?: Filter): Promise<number> {
        throw new Error("Method not implemented.");
    }
    Post(T: Comment): Promise<Comment> {
        throw new Error("Method not implemented.");
    }
    Put(T: Comment): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    Delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    DeleteMany(Ids: number[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
async  CommentSearchVer2(filter?): Promise<any[]> {
        let rec = await axios.get('/comments/searchv3/?', {
            baseURL: AppSetting.apiEndPointComment,
            params:filter
        })
        return rec.data
    }

}
