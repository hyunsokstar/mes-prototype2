import { Injectable } from '@nestjs/common';
import { ColumnsRepository } from './columns.repository';


@Injectable()
export class ColumnsService {
  constructor(private readonly colunmnsRepository: ColumnsRepository) { }
    // constructor(private readonly columnsRepository: ColumnsRepository) {} // 이줄 때문에 에러
}
