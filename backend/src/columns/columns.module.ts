import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { ColumnNames, ColumnNamesSchema } from './columns.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: ColumnNames.name, schema: ColumnNamesSchema }])
  ],
  controllers: [ColumnsController],
  providers: [ColumnsService]
  // exports: [ColumnsService ],

})
export class ColumnsModule { }
