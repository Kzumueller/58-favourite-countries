"use client"

type Props = {
  type?: "text" | "email" | "password";
  disabled?: boolean;
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string) => void;
};

export const Input = ({ type = "text", disabled = false, placeholder = "", onChange, value }: Props) => {

  return <input
    type={type}
    disabled={disabled}
    placeholder={placeholder}
    className="input input-bordered w-full"
    onChange={({ target: { value } }) => { if(onChange) onChange(value) }}
    {...(value ? { value } : {})}
  />
}