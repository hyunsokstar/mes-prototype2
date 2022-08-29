import { log } from 'console';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatsColumns } from './cats_columns.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import { CatCurrentDto } from './dto/cats.current.dto';


@Injectable()
export class CatsRepository {

    constructor(
        @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
        @InjectModel(CatsColumns.name) private readonly catsColumns: Model<CatsColumns>,
    ) { }

    async saveColumnDatas(data: any) {
        console.log("data at cat repository for saveColumns: ", data);
    }

    async existsByKey(key: any): Promise<boolean> {
        // throw new Error('Method not implemented.');
        const result = await this.catsColumns.exists({ key });
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

    async existsById(id: string): Promise<boolean> {
        const result = await this.catModel.exists({ _id: id });

        if (result) return true

        else return false

    }

    async create(cat: CatRequestDto): Promise<Cat> {
        console.log("cat :::::", cat);
        return await this.catModel.create(cat);
    }

    async createColumns(cat: any): Promise<CatsColumns> {
        console.log("cat :::::", cat);
        return await this.catsColumns.create(cat);
    }

    async update(filter, cat: CatRequestDto): Promise<Cat> {
        return await this.catModel.findOneAndUpdate(filter, cat);
    }

    async updateCatsColumns(filter, cat: any): Promise<CatsColumns> {
        return await this.catsColumns.findOneAndUpdate(filter, cat);
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
        return await this.catModel.find().select('-password');;
    }

}
