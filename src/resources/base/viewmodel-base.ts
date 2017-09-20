import { Filter } from './filter-base';
export interface ViewModelBase<T> {
    items: Array<T>
    selectedItem: T
    selectedList: Array<T>
    filter: Filter
    runFilter()
    runCreate()
    runUpdate(item: T)
    runDelete(id)
    runDeleteMany(ids: Array<string> | Array<number>)


}