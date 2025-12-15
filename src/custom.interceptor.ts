import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Console } from 'console';
import { map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    console.log('THIS IS INTERCEPTING THE REQUEST');
    console.log(context);
    return handler.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object' && !Array.isArray(data) && 'created_at' in data) {
          const response = {
            ...data,
            createdAt: data.created_at,
          };
          delete response.updated_at;
          delete response.created_at;
          return response;
        }
        return data;
      }),
    );
  }
}
