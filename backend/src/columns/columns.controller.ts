import { ColumnsService } from './columns.service';
import { Controller, Get } from '@nestjs/common';

@Controller('columns')
export class ColumnsController {
    constructor(
        private readonly ColumnsService: ColumnsService,
    ){}
    
    @Get("")
    getAllCats() {
    //   const allCats = this.CatsService.findAllCats();
    //   console.log("allCats : ", allCats);
  
      return "columns controller success";
    }

}
