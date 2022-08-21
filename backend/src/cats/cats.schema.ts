import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";


const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {

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

  @Prop()
  age: number;

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

  @ApiProperty({
    example: "tennis",
    description: "hobby"
  })
  @IsString()
  hobby: string;

  @ApiProperty({
    example: "tere1234!@",
    description: "password",
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;


  // @Prop()
  // @IsString()
  // imgUrl: string;

  @ApiProperty({
    example: 177,
    description: "신장"
  })

  @Prop({
    required: true,
  })
  @IsNumber()
  height: number;

  @Prop({
    required: true,
  })
  @ApiProperty({
    example: "man",
    description: "성별"
  })
  @IsString()
  gender: string;

  @Prop({
    default:
      'none',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string,
    imgUrl: string;
  };

}

export const CatSchema = SchemaFactory.createForClass(Cat);

// 가상 필드 사용법은 다음과 같다.
// 형식적으로 알아 두자
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl
  }
})
