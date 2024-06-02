type Props = {
  message: string;
  description?: string;
};

/** displays an alert at the top of the page */
export const Alert = ({ message, description }: Props) => {

  return <div role="alert" className="fixed max-w-96 right-3 top-16 alert alert-error shadow-lg">
    <div>
      <h3 className="font-bold">{message}</h3>
      {description && <div className="text-xs">{description}</div>}
    </div>
  </div>
}