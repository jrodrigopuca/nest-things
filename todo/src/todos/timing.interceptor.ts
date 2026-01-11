import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { toApiResponse, APIResponse } from './api-response.util';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const start = Date.now();
    return next.handle().pipe(
      map((body: unknown): APIResponse<unknown> => {
        const durationMs = Date.now() - start;
        return toApiResponse(body, { durationMs });
      }),
    );
  }
}
