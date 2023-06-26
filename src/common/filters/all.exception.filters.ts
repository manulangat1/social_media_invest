import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): Response {
    console.log('In  the all exception filter');
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    console.log(response);
    if (exception['code'] === 'ENOENT') {
      return response.status(HttpStatus.NOT_FOUND).json('File not found');
    }
    // Errors that will be handled and get thrown within the application
    if (exception instanceof HttpException) {
      const responseMsg = exception.getResponse();

      // Transform the exception error as the error code
      if (responseMsg['error']) {
        responseMsg['code'] = responseMsg['error']
          .split(' ')
          ?.join('_')
          ?.toUpperCase();
        delete responseMsg['error'];
      }

      // Error which returns message as an array, show each item independently
      // Generally these are the errors which will be thrown by the validation pipes
      if (responseMsg['message'] && Array.isArray(responseMsg['message'])) {
        responseMsg['message'] = responseMsg['message'][0];
      }

      delete responseMsg['statusCode'];
      return response.status(exception.getStatus()).json(responseMsg);
    }

    // Unhandled exceptions
    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(
        'Internal server error, get in touch with the admin for an easier resolution',
      );
  }
}
