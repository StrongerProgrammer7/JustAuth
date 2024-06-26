import { Injectable,NestMiddleware } from '@nestjs/common';
import { Request,Response,NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware 
{
	use(req: Request,res: Response,next: NextFunction) 
	{
		console.group('Logger');
		console.log('Request body...',req.body);
		console.log('Request params...',req.params);
		console.log('Request path...',req.path);
		console.log('Request ip...',req.ip);
		console.groupEnd();
		next();
	}
}
