import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        console.log("Before..");
        const now = Date.now();
        // return next
        //     .handle()
        //     .pipe(tap(() => console.log(`After... $(Date.now()- now}ms`)));

          return next.handle().pipe(
            map((data) => ({            // 응답 데이터를 커스터 마이징
              success: true,
              data,
            })),
          );

    }
}
