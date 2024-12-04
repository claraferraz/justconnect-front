import { AxiosError } from 'axios';
import { UseFormSetError, FieldValues, Path } from 'react-hook-form';

export function handleErrors<T extends FieldValues>(
  error: unknown,
  setError?: UseFormSetError<T>,
  setRegisterError?: React.Dispatch<React.SetStateAction<string | null>> // Novo parâmetro para exibir no Alert
): string[] {
  const errorMessages: string[] = [];

  if (error instanceof AxiosError) {
    if (error.response && error.response.status >= 400) {
      const backendMessages = error.response.data?.message;

      // Caso o erro tenha mensagens específicas do backend
      if (backendMessages) {
        if (typeof backendMessages === 'object') {
          for (const [field, messages] of Object.entries(backendMessages)) {
            if (Array.isArray(messages)) {
              messages.forEach((msg: string) => {
                errorMessages.push(msg);
                if (setError) {
                  setError(field as Path<T>, {
                    type: 'manual',
                    message: msg,
                  });
                }
              });
            }
          }
        } else {
          errorMessages.push(backendMessages || 'Erro ao processar a requisição.');
        }
      } else {
        errorMessages.push('Erro inesperado no servidor.');
        if (setRegisterError) {
          setRegisterError('Erro inesperado no servidor.'); // Exibe no Alert
        }
      }
    } else if (error.request) {
      errorMessages.push('Não foi possível conectar ao servidor. Verifique sua conexão.');
      if (setRegisterError) {
        setRegisterError('Não foi possível conectar ao servidor. Verifique sua conexão.'); // Exibe no Alert
      }
    } else {
      errorMessages.push(error.message || 'Erro inesperado.');
      if (setRegisterError) {
        setRegisterError(error.message || 'Erro inesperado.'); // Exibe no Alert
      }
    }
  } else if (typeof error === 'string') {
    errorMessages.push(error);
    if (setRegisterError) {
      setRegisterError(error); // Exibe no Alert
    }
  } else {
    errorMessages.push('Erro inesperado.');
    if (setRegisterError) {
      setRegisterError('Erro inesperado.'); // Exibe no Alert
    }
  }

  return errorMessages;
}
