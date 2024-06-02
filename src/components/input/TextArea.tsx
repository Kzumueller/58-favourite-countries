"use client"

type Props = {
  text: string;
  onChange: (text: string) => void;
  placeholder: string;
};

export const TextArea = ({placeholder, text, onChange}: Props) => {

  return <textarea
    className="textarea textarea-bordered w-full mt-4"
    placeholder={placeholder}
    maxLength={1024}
    value={text}
    onChange={({target: {value}}) => onChange(value)}
  />
}