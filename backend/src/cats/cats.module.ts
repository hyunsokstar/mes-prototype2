import { CatsController } from '../cats/controllers/cats.controller';
import { CatsService } from '../cats/services/cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats.schema';
import { CatsRepository } from './cats.repository';
import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express/multer';


@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]), forwardRef(() => AuthModule)],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})

export class CatsModule { }