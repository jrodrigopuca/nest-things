import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type Meta = Record<string, unknown>;
interface APIResponse<T> {
  data: T;
  meta: Meta;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<APIResponse<unknown>> {
    return next.handle().pipe(
      map((body: unknown): APIResponse<unknown> => {
        const timestamp = new Date().toISOString();
        if (
          typeof body === 'object' &&
          body !== null &&
          'data' in body &&
          'meta' in body
        ) {
          const b = body as { data: unknown; meta: Meta };
          return {
            data: b.data,
            meta: { ...b.meta, timestamp },
          };
        } else {
          return {
            data: body,
            meta: { timestamp },
          };
        }
      }),
    );
  }
}
