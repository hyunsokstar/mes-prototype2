import { log } from 'console';
import { Injectable } from '@nestjs/common';
// import { Model } from 'mongoose';
// import { ColumnNames } from './columns.schema';



@Injectable()
export class ColumnsRepository {
    constructor() { }
    
    async findAllCats() {
        return await "hi"
    }

}
