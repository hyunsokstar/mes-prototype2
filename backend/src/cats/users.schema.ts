// 이메일 네임 age hobby 이렇게 네개만 추가
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";


// create, update 시점 필드 자동 추가 및 자동 저장
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class RowsForUsersTable extends Document {

  @ApiProperty({
    example: "terecal@daum.net",
    description: "email"
  })
  @Prop({
    required: true,
    // unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "hyunsok",
    description: "name"
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop()
  age: number;

  @ApiProperty({
    example: "tennis",
    description: "hobby"
  })
  @IsString()
  hobby: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string,
    age: number,
    hobby: string
  };

}

export const RowsForUsersTableSchema = SchemaFactory.createForClass(RowsForUsersTable);

// 가상 필드 사용법은 다음과 같다.
// 형식적으로 알아 두자
RowsForUsersTableSchema.virtual('readOnlyData').get(function (this: RowsForUsersTable) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  }
})
