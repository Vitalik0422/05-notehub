import css from './ErrorMessage.module.css';

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <div className={css.errorText}>{message}</div>;
};

export default ErrorMessage;
