const NO_CONNECTION = 'לא ניתן להתחבר לשרת. יש לבדוק את החיבור ולנסות שוב.';
const UNKNOWN = 'אירעה שגיאה. יש לנסות שוב.';

export const getErrorMessages = (error) => {
  if (!error.response) return [NO_CONNECTION];
  const { message, errors } = error.response.data ?? {};
  if (errors?.length) return errors;
  return [message || UNKNOWN];
};
