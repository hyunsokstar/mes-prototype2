import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";


const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class ColumnNames extends Document {

  @ApiProperty({
    example: "users_table",
    description: "subject"
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    example: "name",
    description: "column_name"
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  column_name: string;

  readonly readOnlyData: {
    id: string;
    subject: string;
    column_name: string,
  };

}

export const ColumnNamesSchema = SchemaFactory.createForClass(ColumnNames);

ColumnNamesSchema.virtual('readOnlyData').get(function (this: ColumnNames) {
  return {
    id: this.id,
    subject: this.subject,
    column_name: this.column_name,
  }
})
