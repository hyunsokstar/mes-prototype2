import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";


const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class TodosTable extends Document {

  @ApiProperty({
    example: "무한 스크롤 구현 하기",
    description: "할일"
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  todo: string;

  @Prop()
  level: number;

  @ApiProperty({
    example: "url",
    description: "페이지 url"
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  page: string;


  @Prop({
    required: false,
  })
  @ApiProperty({
    example: "김철수",
    description: "담당자"
  })
  @IsString()
  // @IsNotEmpty()
  manager: string;



  readonly readOnlyData: {
    id: string;
    todo: string;
    level: number;
    page: string;
    manager: string;
  };

}

export const TodosTableSchema = SchemaFactory.createForClass(TodosTable);

TodosTableSchema.virtual('readOnlyData').get(function (this: TodosTable) {
  return {
    id: this.id,
    todo: this.todo,
    page: this.page,
    manager: this.manager
  }
})
