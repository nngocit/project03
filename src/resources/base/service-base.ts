import { Filter } from './filter-base';
export interface BaseService<T> {
    Get(id: number): Promise<T>
    GetAll(filter?: Filter): Promise<any>
    GetCount(filter?: Filter): Promise<number>
    Post(item: T): Promise<T>
    Put(item: T): Promise<boolean>
    Delete(id: number | string): Promise<boolean>
    DeleteMany(Ids: Array<number>): Promise<boolean>
}


