import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type Meta = Record<string, unknown>;

interface ApiEnvelope {
  data: unknown;
  meta: Meta;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasMeta(value: unknown): value is { meta: Meta } {
  return (
    isPlainObject(value) && 'meta' in value && isPlainObject(value['meta'])
  );
}

function isEnvelope(value: unknown): value is ApiEnvelope {
  return hasMeta(value) && 'data' in value;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((body: unknown) => {
        const timestamp = new Date().toISOString();

        // 1) Ya viene envuelto
        if (isEnvelope(body)) {
          return {
            data: body.data,
            meta: {
              ...body.meta,
              timestamp: body.meta.timestamp ?? timestamp,
            },
          };
        }

        // 2) Objeto parcial con meta y/o data
        if (isPlainObject(body) && ('meta' in body || 'data' in body)) {
          const meta = hasMeta(body) ? body.meta : {};

          if ('data' in body) {
            return {
              data: body.data,
              meta: { ...meta, timestamp },
            };
          }

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { meta: _meta, ...rest } = body;

          return {
            data: rest,
            meta: { ...meta, timestamp },
          };
        }

        // 3) Cualquier otro tipo
        return {
          data: body,
          meta: { timestamp },
        };
      }),
    );
  }
}
