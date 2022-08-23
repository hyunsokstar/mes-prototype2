import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { PositiveIntPipe } from '../../common/pipes/positiveInt.pipe';
import { CatsService } from '../services/cats.service';
import { getSystemErrorMap } from 'util';
import {
  Controller, Delete, Get, HttpException, Param, Patch, Post, Put, UseFilters, ParseIntPipe,
  UseInterceptors,
  Body,
  UseGuards,
  Req,
  UploadedFiles,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from '../../common/interceptors/success.interceptor';
import { CatRequestDto } from '../dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from '../dto/cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { Request } from "express"
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Injectable, UnauthorizedException } from '@nestjs/common';


import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';

import { Cat } from '../cats.schema';


@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(
    private readonly CatsService: CatsService,
    private readonly authService: AuthService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('login_check')
  loginCheckForUserReuquest(@CurrentUser() cat) {

    if (cat) {
      console.log("현재 로그인한 cat 정보 : ", cat);
      return cat.readOnlyData;
    } else {
      {
        throw new UnauthorizedException('로그인 상태가 아닙니다.');
      }
    }
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData;
  }


  @Get("allCats")
  getAllCats() {
    const allCats = this.CatsService.findAllCats();
    console.log("allCats : ", allCats);

    return allCats;
  }

  @Post("saveMembers")
  async saveMultiUsers(@Body() data) {
    console.log("유저 테이블 정보 저장 check !!");
    // console.log("body data : ", data);

    return this.CatsService.saveMultiUsers(data);
  }

  @Post("deleteMembers")
  async deleteMultiUsers(@Body() data) {
    console.log("유저 테이블 정보 저장 check !!");
    // console.log("body data : ", data);

    return this.CatsService.deleteMultiUsers(data);
  }

  @ApiResponse({
    status: 500,
    description: 'server Errror'
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadOnlyCatDto
  })
  @ApiOperation({ summary: "회원 가입" })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    console.log("body : ", body);
    console.log("회원 가입 실행 확인 !!");
    return await this.CatsService.signUp(body);
  }

  @ApiOperation({ summary: "로그인" })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtlogin(data);
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  // @ApiOperation({ summary: "프로필 이미지 업로드" })
  // @UseInterceptors(FileInterceptor("file"))
  // @Post('upload')
  // uploadCatImg() {
  //   return 'uploadImg';
  // }

  @ApiOperation({ summary: "이미지 대량 업로드" })
  @UseInterceptors(FilesInterceptor("image", 10, multerOptions('cats')))
  // @UseGuards(JwtAuthGuard)
  @Post('upload')
  async uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data
    // @CurrentUser() cat: Cat,
  ) {
    console.log(files);
    console.log("data : ", data);
    console.log("data : ", data.rowId);
    
    await this.CatsService.uploadImg(data.rowId, files);

    return "파일 업로드 성공";

  }

}