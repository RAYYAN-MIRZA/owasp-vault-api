import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const csrfHeader = req.headers['x-xsrf-token'];
    const csrfCookie = req.cookies['XSRF-TOKEN'];

    if (!csrfHeader || csrfHeader !== csrfCookie) {
      throw new UnauthorizedException('CSRF token mismatch');
    }
    return true;
  }
}
