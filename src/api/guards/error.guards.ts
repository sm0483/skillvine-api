import IError from '@/api/interfaces/error.interfaces';


const errorGuard = (obj: IError): obj is IError => {
  return (
    typeof obj === 'object' &&
    typeof obj.status === 'number' &&
    typeof obj.message === 'string'
  );
};

export default errorGuard;
