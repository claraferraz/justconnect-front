import { AxiosError } from 'axios';
import { UseFormSetError, FieldValues, Path } from 'react-hook-form';

export function handleErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>
): string[] {
  const errorMessages: string[] = [];

  if (error instanceof AxiosError) {
    if (error.response && error.response.status >= 400) {
      const backendMessages = error.response.data?.message;

      if (backendMessages) {
        if (typeof backendMessages === 'object') {
          for (const [field, messages] of Object.entries(backendMessages)) {
            if (Array.isArray(messages)) {
              messages.forEach((msg: string) => {
                errorMessages.push(msg);
                setError(field as Path<T>, {
                  type: 'manual',
                  message: msg,
                });
              });
            }
          }
        } else {
          errorMessages.push(backendMessages || 'Erro ao processar a requisição.');
        }
      } else {
        errorMessages.push('Erro inesperado no servidor.');
      }
    } else if (error.request) {
      errorMessages.push('Não foi possível conectar ao servidor. Verifique sua conexão.');
    } else {
      errorMessages.push(error.message || 'Erro inesperado.');
    }
  } else if (typeof error === 'string') {
    errorMessages.push(error);
  } else {
    errorMessages.push('Erro inesperado.');
  }

  return errorMessages;
}
