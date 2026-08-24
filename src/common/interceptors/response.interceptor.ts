import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

export class ResponseInterceptor<T> implements NestInterceptor<T, any>{
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any>{
        const response = context.switchToHttp().getResponse()
        const request = context.switchToHttp().getRequest()
        
        console.log(response.statusCode);
        
        
        return next.handle().pipe(
           
            map((data) => ({
                status: response.statusCode,
                success: true,
                data
            }))
        )
    }
}