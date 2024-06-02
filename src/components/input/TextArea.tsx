"use client"

type Props = {
  text: string;
  onChange: (text: string) => void;
  placeholder: string;
  onPressEnter?: () => void;
};

export const TextArea = ({placeholder, text, onChange, onPressEnter = () => {}}: Props) => {

  return <textarea
    className="textarea textarea-bordered w-full mt-4"
    placeholder={placeholder}
    maxLength={1024}
    value={text}
    onChange={({target: {value}}) => onChange(value)}
    onKeyDown={event => {
      if(event.key === "Enter") onPressEnter();
    }}
  />
}