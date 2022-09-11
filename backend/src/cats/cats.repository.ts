import { log } from 'console';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { ColumnsTable } from './cats_columns.schema';
import { TodosTable } from './TodosTable.schema';
import { RowsForUsersTable } from './RowsForUsersTable.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import { CatCurrentDto } from './dto/cats.current.dto';


@Injectable()
export class CatsRepository {

    constructor(
        @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
        @InjectModel(ColumnsTable.name) private readonly columnsTableModel: Model<ColumnsTable>,
        @InjectModel(RowsForUsersTable.name) private readonly rowsForUsersTable: Model<RowsForUsersTable>,
        @InjectModel(TodosTable.name) private readonly rowsForTodosTable: Model<TodosTable>,
    ) { }

    async updateColumWidthForTableAndKey(data: any) {
        // throw new Error('Method not implemented.');
        console.log("data for update width: ", data);
        const result = await this.columnsTableModel.findOneAndUpdate({ table_name: data.table_name, key: data.key }, { width: data.width })
        console.log("result : ", result);
    }

    async deleteColumnsByIdsArray(ids_for_delete: any) {

        console.log("ids_for_delete : ", ids_for_delete);
        const result = await this.columnsTableModel.deleteMany(
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

        const total_page = await this.columnsTableModel.find({ table_name: table_name }).count() / limit
        const total_page2 = Math.ceil(total_page);
        // console.log("total_page : ", total_page);

        const columns_list =
            // columnsTableModel 에 대해 table_name 으로 검색해서 가져와라 
            await this.columnsTableModel.find({ table_name: table_name })
                // 페이지 수에 한페이지당 개수를 곱해서 그 다음부터 가져 와라 
                .skip((pageNum - 1) * limit).limit(limit)
                // order 로 정렬 해라 
                .sort({ order: 1 });

        console.log("column_list for columns page list : ", columns_list);

        return {
            current_page: pageNum,
            total_page: total_page2,
            columns_list
        }

    }
    async findAllColumnsWithoutPagination(table_name) {
        // const total_count = await this.columnsTableModel.find({ table_name: table_name }).count()
        // console.log("total_count, limit : ", total_count, limit);
        // console.log("total_page : ", total_page);
        const columns_list =
            // columnsTableModel 에 대해 table_name 으로 검색해서 가져와라 
            await this.columnsTableModel.find({ table_name: table_name }).sort({ order: 1 })

        return {
            columns_list
        }

    }

    async allCatsColumns() {

        const columns_list =
            await this.columnsTableModel.find({}).sort({ table_name: 1 })

        return {
            columns_list
        }

    }

    async saveColumnDatas(data: any) {
        console.log("data at cat repository for saveColumns: ", data);
    }

    async existsByKey(_id: any): Promise<boolean> {
        // throw new Error('Method not implemented.');
        const result = await this.columnsTableModel.exists({ _id });
        if (result) {
            return true
        } else return false
    }

    async findByIdAndUpdateImg(rowId: string, fileName: string) {
        console.log("rowId for repo : ", rowId);

        const result = await this.catModel.findByIdAndUpdate(rowId, { imgUrl: `http://localhost:8000/media/${fileName}` });
        return result;

    }
    // fix 1122 
    async findByIdForTodosTable(todoId: string) {
        // const result = await this.todosForTodosTable.findByIdAndUpdate(todoId, { imgUrl: `http://localhost:8000/media/${fileName}` });

        const result = await this.rowsForTodosTable.exists({ _id: todoId });

        if (result) return true

        else return false

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

    async deleteRowsForTaskBoard(ids_for_delete: []) {
        console.log("ids_for_delete : ", ids_for_delete);
        const result = await this.rowsForUsersTable.deleteMany(
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

    async createForTodosTable(todo: any): Promise<TodosTable> {
        console.log("user for RowsForUsersTable at repository :::::", todo);
        return await this.rowsForTodosTable.create(todo);
    }

    async createColumns(cat: any): Promise<ColumnsTable> {
        console.log("cat :::::", cat);
        return await this.columnsTableModel.create(cat);
    }

    async update(filter, cat: CatRequestDto): Promise<Cat> {
        return await this.catModel.findOneAndUpdate(filter, cat);
    }

    async updateTodosTable(filter, todo: any): Promise<TodosTable> {

        console.log("filter : ", filter);
        console.log("todo : ", todo);



        return await this.rowsForTodosTable.findOneAndUpdate(filter, todo);
    }

    async updateForUsersTable(filter, user: any): Promise<RowsForUsersTable> {
        return await this.rowsForUsersTable.findOneAndUpdate(filter, user);
    }

    async updateColumnsTable(filter, cat: any): Promise<ColumnsTable> {
        return await this.columnsTableModel.findOneAndUpdate(filter, cat);
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
            columns_for_grid = await this.columnsTableModel.find({ table_name: table_name }).sort({ order: 1 });
            rows_for_grid = await this.rowsForUsersTable.find().select('-password');

            total_page = await this.rowsForUsersTable.find({ table_name: table_name }).count() / limit
            total_page2 = Math.ceil(total_page);
            // console.log("total_page : ", total_page);

            rows_for_grid =
                // columnsTableModel 에 대해 table_name 으로 검색해서 가져와라 
                await this.rowsForUsersTable.find({ table_name: table_name })
                    // 페이지 수에 한페이지당 개수를 곱해서 그 다음부터 가져 와라 
                    .skip((pageNum - 1) * limit).limit(limit)
                    // order 로 정렬 해라 
                    .sort({ createAt: 1 });
                } 
                
                console.log("rows_for_grid : ", rows_for_grid);
        // console.log("columns_for_grid : ", columns_for_grid);


        let data_for_grid = {
            // page:pageNum,
            current_page: pageNum,
            total_page: total_page2,
            columns_for_grid: columns_for_grid,
            rows_for_grid: rows_for_grid
        }

        return data_for_grid;

    }

    async getAllTodosForUsersTable(pageNum, limit) {
        console.log("limit : ", limit);
        console.log("pageNum : ", pageNum);
        
        const todos_for_data_grid = await this.rowsForTodosTable.find()
            // 페이지 수에 한페이지당 개수를 곱해서 그 다음부터 가져 와라             

            .skip(limit* (pageNum-1))
            .limit(limit)
            // .sort({ createdAt: 1 })
            // order 로 정렬 해라 

            console.log("todos for data grid : ", todos_for_data_grid);
            

        let total_page = await this.rowsForTodosTable.find().count() / limit
        let total_page2 = Math.ceil(total_page);

        let data_for_grid = {
            current_page: pageNum,
            total_page: total_page2,
            rows_for_grid: todos_for_data_grid
        }

        return data_for_grid;


    }

}
