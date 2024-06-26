import { Request,Response,NextFunction } from 'express';
import { ApiError } from 'src/exception/api-error.service';


export function errorMiddleware(req: Request,res: Response,next: NextFunction) 
{

	try 
	{
		next();
	} catch (error) 
	{

		if (error instanceof ApiError)
			return res.status(error.getStatus()).json({ message: error.message,errors: error.errors });

		return res.status(500).json({ message: 'Problem with server' });
	}
}


