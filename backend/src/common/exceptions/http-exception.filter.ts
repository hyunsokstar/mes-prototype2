import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    // const error = exception.getResponse();

    // response.status(status).json({
    //   statusCode: status,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    //   error,
    // });

    const error = exception.getResponse() as  // 타입 설정 , 사용자가 직접 설정한 에러는 스트링, 자체 에러는 객체로 넘어 오고 있음
      | string
      | { error: string; statusCode: number; message: string | string[] }; 

    if (typeof error === 'string') { // 사용자가 발생 시킨 에러의 타입은 스트링
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      });
    } else {   // 자체 에러일 경우 객체 형식으로 넘어 오고 있음
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        ...error,
      });
    }
  }
}

