import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import { CatCurrentDto } from './dto/cats.current.dto';


@Injectable()
export class CatsRepository {
    constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) { }

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

    async findByIdAndUpdateImg(rowId: string, fileName: string) {
        // const cat = await this.catModel.findById(id);

        console.log("rowId for repo : ", rowId);
        

        const new_cat = await this.catModel.findByIdAndUpdate(rowId, { imgUrl: `http://localhost:8000/media/${fileName}` },
            function (err, docs) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Updated User : ", docs);
                }

            });

        // const newCat = await cat.save();

        // console.log(newCat);
        return new_cat;
    }


    async existsByEmail(email: string): Promise<boolean> {
        const result = await this.catModel.exists({ email });
        // return result;
        if (result) return true
        else return false
    }
    async existsById(id: string): Promise<boolean> {
        const result = await this.catModel.exists({ _id: id });
        // return result;
        if (result) return true
        else return false
    }

    async create(cat: CatRequestDto): Promise<Cat> {

        console.log("cat :::::", cat);


        return await this.catModel.create(cat);
    }

    // let doc = await Character.findOneAndUpdate(filter, update);

    async update(filter, cat: CatRequestDto): Promise<Cat> {
        return await this.catModel.findOneAndUpdate(filter, cat);
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
