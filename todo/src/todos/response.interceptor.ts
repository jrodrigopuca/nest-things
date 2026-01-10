import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface PartialResponse {
  meta?: Record<string, unknown>;
  data?: unknown;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((partial: PartialResponse) => {
        const { meta = {}, data, ...rest } = partial || {};
        const responseData = data ?? rest;
        if (
          responseData &&
          typeof responseData === 'object' &&
          'meta' in responseData
        ) {
          delete responseData['meta'];
        }

        return {
          data: { ...responseData },
          meta: {
            ...meta,
            timestamp: new Date().toISOString(),
          },
        };
      }),
    );
  }
}
