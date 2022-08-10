import { CatsService } from './cats/cats.service';
import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catsService: CatsService
  ) { }

  // @Get('/hello/:id/:name')
  @Get('/hello')
  getHello(
    @Req() req: Request,
    @Body() Body,
    @Param() param: { id: string; name: string },
  ): string {
    // console.log(req);
    // console.log(param);
    // return this.appService.getHello();
    // return this.catsService.hiCatService();
    return "hi"
  }

}