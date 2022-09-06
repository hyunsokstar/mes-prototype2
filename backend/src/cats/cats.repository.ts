import { log } from 'console';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { ColumnsTable } from './cats_columns.schema';
import { RowsForUsersTable } from './RowsForUsersTable.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import { CatCurrentDto } from './dto/cats.current.dto';


@Injectable()
export class CatsRepository {

    constructor(
        @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
        @InjectModel(ColumnsTable.name) private readonly catsColumnsModel: Model<ColumnsTable>,
        @InjectModel(RowsForUsersTable.name) private readonly rowsForUsersTable: Model<RowsForUsersTable>,
    ) { }

    async updateColumWidthForTableAndKey(data: any) {
        // throw new Error('Method not implemented.');
        console.log("data : ", data);
        const result = await this.catsColumnsModel.findOneAndUpdate({ table_name: data.table_name, key: data.key }, { width: data.width })
        console.log("result : ", result);
    }

    async deleteColumnsByIdsArray(ids_for_delete: any) {

        console.log("ids_for_delete : ", ids_for_delete);
        const result = await this.catsColumnsModel.deleteMany(
            {
                _id: {
                    $in: ids_for_delete
                }
            },
        );
        return result;

    }


    // 1page 0 * 2 1 * 2
    async findAllColumnsTable(table_name, pageNum, limit) {

        const total_page = await this.catsColumnsModel.find({ table_name: table_name }).count() / limit
        const total_page2 = Math.ceil(total_page);
        // console.log("total_page : ", total_page);

        const columns_list =
            // catsColumnsModel 에 대해 table_name 으로 검색해서 가져와라 
            await this.catsColumnsModel.find({ table_name: table_name })
                // 페이지 수에 한페이지당 개수를 곱해서 그 다음부터 가져 와라 
                .skip((pageNum - 1) * limit).limit(limit)
                // order 로 정렬 해라 
                .sort({ order: 1 });

        // console.log("column_list : ", columns_list);

        return {
            current_page: pageNum,
            total_page: total_page2,
            columns_list
        }

    }
    async findAllColumnsWithoutPagination(table_name) {
        // const total_count = await this.catsColumnsModel.find({ table_name: table_name }).count()
        // console.log("total_count, limit : ", total_count, limit);
        // console.log("total_page : ", total_page);
        const columns_list =
            // catsColumnsModel 에 대해 table_name 으로 검색해서 가져와라 
            await this.catsColumnsModel.find({ table_name: table_name }).sort({ order: 1 })

        return {
            columns_list
        }

    }

    async saveColumnDatas(data: any) {
        console.log("data at cat repository for saveColumns: ", data);
    }

    async existsByKey(_id: any): Promise<boolean> {
        // throw new Error('Method not implemented.');
        const result = await this.catsColumnsModel.exists({ _id });
        if (result) {
            return true
        } else return false
    }

    async findByIdAndUpdateImg(rowId: string, fileName: string) {
        console.log("rowId for repo : ", rowId);

        const result = await this.catModel.findByIdAndUpdate(rowId, { imgUrl: `http://localhost:8000/media/${fileName}` });
        return result;

    }

    async searchUsers(searchOption: string, searchKeyword: string) {
        console.log("검색 조건 check  : ", searchOption, searchKeyword);

        const search_result = await this.catModel.find().where(searchOption).regex(searchKeyword);

        return search_result;
    }

    async deleteUsersByIdsArray(ids_for_delete: []) {

        console.log("ids_for_delete : ", ids_for_delete);
        const result = await this.catModel.deleteMany(
            {
                _id: {
                    $in: ids_for_delete
                }
            },
        );
        return result;
    }

    async existsByEmail(email: string): Promise<boolean> {
        const result = await this.catModel.exists({ email });
        if (result) {
            return true
        } else return false
    }

    async existsByEmailForRowsForUsersTable(email: string): Promise<boolean> {
        const result = await this.rowsForUsersTable.exists({ email });
        if (result) {
            return true
        } else return false
    }

    async existsById(id: string): Promise<boolean> {
        const result = await this.catModel.exists({ _id: id });

        if (result) return true

        else return false

    }

    async existsByIdForRowsForUsersTable(id: string): Promise<boolean> {
        const result = await this.rowsForUsersTable.exists({ _id: id });
        if (result) return true
        else return false
    }

    async create(cat: CatRequestDto): Promise<Cat> {
        console.log("cat :::::", cat);
        return await this.catModel.create(cat);
    }
    async createForUsersTable(user: any): Promise<RowsForUsersTable> {
        console.log("user for RowsForUsersTable at repository :::::", user);
        return await this.rowsForUsersTable.create(user);
    }

    async createColumns(cat: any): Promise<ColumnsTable> {
        console.log("cat :::::", cat);
        return await this.catsColumnsModel.create(cat);
    }

    async update(filter, cat: CatRequestDto): Promise<Cat> {
        return await this.catModel.findOneAndUpdate(filter, cat);
    }

    async updateForUsersTable(filter, user: any): Promise<RowsForUsersTable> {
        return await this.rowsForUsersTable.findOneAndUpdate(filter, user);
    }

    async updateColumnsTable(filter, cat: any): Promise<ColumnsTable> {
        return await this.catsColumnsModel.findOneAndUpdate(filter, cat);
    }

    async findCatByIdWithoutPassword(
        catId: string,
    ): Promise<CatCurrentDto | null> {
        const cat = await this.catModel.findById(catId).select('-password');
        return cat;
    }

    async findCatByEmail(email: string): Promise<Cat | null> {
        const cat = await this.catModel.findOne({ email });
        return cat;
    }

    async findAllCats() {
        return await this.catModel.find().select('-password');
    }

    async getListForUsersTable() {
        return await this.rowsForUsersTable.find().select('-password');
    }


    // fix 1122
    async getListByTableName(table_name: string) {
        let target_table_name = table_name;  // ex rowsForUsersTable

        if (target_table_name === "rowsForUsersTable") {
            return await this.rowsForUsersTable.find().select('-password');
        } else {
            return await this.rowsForUsersTable.find({ table_name: table_name }).select('-password');
        }
    }

    async getGridDataByTableName(table_name: string, pageNum: number, limit: number) {
        console.log("table_name : ", table_name);

        let columns_for_grid;
        let rows_for_grid;

        let total_page;
        let total_page2;

        if (table_name === "rowsForUsersTable") {
            columns_for_grid = await this.catsColumnsModel.find({ table_name: table_name }).sort({ order: 1 });
            rows_for_grid = await this.rowsForUsersTable.find().select('-password');

            total_page = await this.rowsForUsersTable.find({ table_name: table_name }).count() / limit
            total_page2 = Math.ceil(total_page);
            // console.log("total_page : ", total_page);

            rows_for_grid =
                // catsColumnsModel 에 대해 table_name 으로 검색해서 가져와라 
                await this.rowsForUsersTable.find({ table_name: table_name })
                    // 페이지 수에 한페이지당 개수를 곱해서 그 다음부터 가져 와라 
                    .skip((pageNum - 1) * limit).limit(limit)
                    // order 로 정렬 해라 
                    .sort({ order: 1 });

        } else {
            columns_for_grid = await this.catsColumnsModel.find({ table_name: table_name }).sort({ order: 1 });
            rows_for_grid = await this.rowsForUsersTable.find().select('-password');

            total_page = await this.rowsForUsersTable.find({ table_name: table_name }).count() / limit
            total_page2 = Math.ceil(total_page);
            // console.log("total_page : ", total_page);

            rows_for_grid =
                // catsColumnsModel 에 대해 table_name 으로 검색해서 가져와라 
                await this.rowsForUsersTable.find({ table_name: table_name })
                    // 페이지 수에 한페이지당 개수를 곱해서 그 다음부터 가져 와라 
                    .skip((pageNum - 1) * limit).limit(limit)
                    // order 로 정렬 해라 
                    .sort({ order: 1 });
        }

        let data_for_grid = {
            // page:pageNum,
            current_page: pageNum,
            total_page:total_page2,
            columns_for_grid: columns_for_grid,
            rows_for_grid: rows_for_grid
        }

        return data_for_grid;

    }

}
