import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export function CsrfTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = uuidv4(); 
  res.cookie('XSRF-TOKEN', token, {
    httpOnly: false,     
    sameSite : 'lax',    
  });
  (req as any).csrfToken = token;
  next();
}
