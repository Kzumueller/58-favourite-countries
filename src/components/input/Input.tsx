"use client"

type Props = {
  type?: "text" | "email" | "password";
  disabled?: boolean;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  onPressEnter?: () => void
};

/** wraps and simplifies a text/email/password input field, optionally supports enter key */
export const Input = ({ onChange, value, type = "text", disabled = false, placeholder = "", onPressEnter = () => {} }: Props) => {

  return <input
    type={type}
    disabled={disabled}
    placeholder={placeholder}
    className="input input-bordered w-full"
    onChange={({ target: { value } }) => onChange(value)}
    value={value}
    onKeyDown={event => {
      if(event.key === "Enter") onPressEnter();
    }}
  />
}