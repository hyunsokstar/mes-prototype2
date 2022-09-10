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
  Bind,
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
  

  @Get("getListForUsersTable")
  getListForUsersTable() {
    const allUsers = this.CatsService.getListForUsersTable();
    console.log("allUsers : ", allUsers);

    return allUsers;
  }

  @Get("getRowsDataByTableName/:table_name")
  @Bind(Param())
  getListByTableName(params) {

    const table_name = params.table_name

    // const allUsers = this.CatsService.getListForUsersTable();
    const allUsers = this.CatsService.getListByTableName(table_name);
    console.log("allUsers : ", allUsers);

    return allUsers;
  }

  @Post("saveMembers")
  async saveMultiUsers(@Body() data) {
    console.log("유저 테이블 정보 저장 check !!");

    return this.CatsService.saveMultiUsers(data);
  }

  @Post("saveRowsForUsersTable")
  async saveForRowsForUsersTable(@Body() data) {
    console.log("유저 테이블 정보 저장 check !!", data);
    this.CatsService.saveRowsForUsersTable(data);
    
    return "유저스 테이블에 row 정보 저장 성공"
  }


  
  @Post("deleteMembers")
  async deleteMultiUsers(@Body() data) {
    console.log("유저 테이블 정보 저장 check !!");
    // console.log("body data : ", data);

    const ids_for_delete_users = data 
    console.log("ids_for_delete_users : ", ids_for_delete_users);

    return this.CatsService.deleteMultiUsers(ids_for_delete_users);
  }

  @Post("deleteRowsForTaskBoard")
  async deleteRowsForTaskBoard(@Body() data) {
    console.log("유저 테이블 정보 저장 check !!");
    // console.log("body data : ", data);

    const ids_for_delete_users = data 
    console.log("ids_for_delete_users : ", ids_for_delete_users);

    // return this.CatsService.deleteMultiUsers(ids_for_delete_users);
    return this.CatsService.deleteRowsForTaskBoard(ids_for_delete_users);
  }

  @Post("deleteColumns")
  async deleteColumns(@Body() data) {
    console.log("유저 테이블 정보 저장 check !!");
    // console.log("body data : ", data);

    return this.CatsService.deleteColumns(data);
  }
// 
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
  async signUp(@Body() body: any) {
    console.log("body : ", body);
    console.log("회원 가입 실행 확인 !!");
    return await this.CatsService.signUp(body);
  }

  @ApiOperation({ summary: "로그인" })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {

    console.log("로그인 확인");    

    return this.authService.jwtlogin(data);
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: "이미지 대량 업로드" })
  @UseInterceptors(FilesInterceptor("image", 10, multerOptions('cats')))
  // @UseGuards(JwtAuthGuard)
  @Post('upload')
  async uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data
  ) {
    console.log(files);
    console.log("data : ", data);
    console.log("data : ", data.rowId);

    await this.CatsService.uploadImg(data.rowId, files);

    return "파일 업로드 성공";

  }

  @ApiOperation({ summary: "유저 테이블 검색" })
  @Post('searchUsers')
  async searchForUsers(
    @Body() data
  ) {
    console.log("data : ", data);
    console.log("searchWorld : ", data.searchOption);
    console.log("searchOption : ", data.searchKeyword);

    const searchOption = data.searchOption;
    const searchKeyword = data.searchKeyword;

    const search_result = await this.CatsService.searchUsers(searchOption, searchKeyword);

    return search_result;

  }

  // crud for columns
  @Post("save_columns")
  async saveColumns(@Body() data) {
    console.log("컬럼 데이터 저장 !!", data);
    const search_result = await this.CatsService.saveColumnDatas(data);

    return "save columns"
  }

  // 

  @Get("cats_columns/:table_name/:pageNum/:limit")
  @Bind(Param())
  getAllColumnsForCats(params) {
    const allCatsColumnns = this.CatsService.findAllColumnsTable(params.table_name, params.pageNum, params.limit);

    console.log("allColumnsTable : ", allCatsColumnns);


    return allCatsColumnns;
  }

  @Post("modify_column_width_by_table_name_and_key")
  async modify_column_width(@Body() data) {
    console.log("data for modify_column_width !!", data);
    const result = await this.CatsService.updateColumWidthForTableAndKey(data);

    return "modify_column_width 성공"
  }

  @Get("getGridDataByTableName/:table_name/:pageNum/:limit")
  @Bind(Param())
  getDataForUsersTable(params) {

    const table_name = params.table_name;
    const dataForGrid = this.CatsService.getGridDataByTableName(table_name, params.pageNum, params.limit);
    console.log("dataForGrid : ", dataForGrid);

    // console.log("params.table_name : ", params.table_name);

    // return allUsers;    
    return dataForGrid;
  }

  @Get("cats_columns/:table_name")
  @Bind(Param())
  getAllColumnsForUsersTableWithoutPagination(params) {
    const allCatsColumnns = this.CatsService.getAllColumnsForUsersTableWithoutPagination(params.table_name);
    console.log("allColumnsTable : ", allCatsColumnns);

    return allCatsColumnns;
  }

  @Get("allCatsColumns")
  @Bind(Param())
  allCatsColumns(params) {
    const allCatsColumnns = this.CatsService.allCatsColumns(params.table_name);
    console.log("allColumnsTable : ", allCatsColumnns);

    return allCatsColumnns;
  }

  // function for todos 2244
  @Post("saveDataForTodosTable")
  async saveDataForTodosTable(@Body() data) {
    console.log("saveDataForTodosTable 실행 확인 !!", data);
    const result_for_create_data_for_todos_table = await this.CatsService.saveDataForTodosTable(data);
    console.log("result_for_create_data_for_todos_table : ", result_for_create_data_for_todos_table);

    return "saveDataForTodosTable 성공"
  }

  @Get("getTodosForTodosTable/:pageNum/:limit")
  @Bind(Param())
  async getTodoListForTodosTable(params) {
    // const dataForGrid = this.CatsService.getGridDataByTableName(table_name, params.pageNum, params.limit);
    const allTodos = await this.CatsService.getAllTodosForUsersTable(params.pageNum, params.limit);
    // console.log("allTodos : ", allTodos);

    return allTodos;
  }

}