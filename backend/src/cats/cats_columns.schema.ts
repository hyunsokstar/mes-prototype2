import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";


const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class CatsColumns extends Document {

  @ApiProperty({
    example: "key",
    description: "column key"
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    example: "name",
    description: "column name"
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop()
  width: number;

  readonly readOnlyData: {
    id: string;
    key: string;
    name: string;
    width: number;
  };

}

export const CatColumnsSchema = SchemaFactory.createForClass(CatsColumns);

CatColumnsSchema.virtual('readOnlyData').get(function (this: CatsColumns) {
  return {
    id: this.id,
    key: this.key,
    name: this.name,
    width: this.width
  }
})
