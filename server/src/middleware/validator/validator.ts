import { ValidationError } from "class-validator/types/validation/ValidationError";
import { ValidatorOptions } from "class-validator/types/validation/ValidatorOptions";

export interface ValidationPipeOptions extends ValidatorOptions 
{
	transform?: boolean;
	disableErrorMessages?: boolean;
	exceptionFactory?: (errors: ValidationError[]) => any;
}
