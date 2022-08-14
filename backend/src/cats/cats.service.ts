import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CatRequestDto } from './dto/cats.request.dto';
import { CatsRepository } from './cats.repository';


@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) { }

  hiCatService() {
    return "hi cat ser !!"
  }

  async saveMultiUsers(data: any) {
    const { users } = data;
    console.log("users check : ", users.length);

    users.map(async (user, index) => {
      // const isCatExist = await this.catsRepository.existsByEmail(user.email);

      let isCatExist;

      if (mongoose.isValidObjectId(user.id)) {
        isCatExist = await this.catsRepository.existsById(user.id);

      } else {
        isCatExist = false
      }

      console.log("user : ", user)

      console.log("isCatExist : ", isCatExist);

      if (isCatExist) {
        console.log("isCatExist : ", isCatExist);
        console.log("user.email  : ", user.email);
        console.log("회원 정보가 이미 존재", index);

        const filter = { _id: user.id }
        const cat = await this.catsRepository.update(filter, { email: user.email, name: user.name, password: "1234" })

      } else {
        console.log("회원 정보 생성 !", index);
        const cat = this.catsRepository.create({
          email: user.email,
          name: user.name,
          password: "1234",
        });
      }
    })

    return "회원 정보 저장 성공 !"

  }

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      return "이미 있는 고양이"
      throw new UnauthorizedException("해당하는 고양이는 이미 존재합니다");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }

  async findAllCats() {
    const allCats = await this.catsRepository.findAllCats();

    return allCats
  }

}
