import { ColumnsService } from './columns.service';
import { Controller, Get } from '@nestjs/common';


@Controller('columns')
export class ColumnsController {
    constructor(
        private readonly ColumnsService: ColumnsService,
    ){}
    
    @Get("")
    getAllCats() {
    // const allCats = this.ColumnsService.findAllCats("name_test");
      return "test";
    }

}
