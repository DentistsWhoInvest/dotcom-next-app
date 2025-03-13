interface TextInputCompTypes {
    string: string;
    placeholder: string;
    inputType?: string;
    onUpdate: (newValue: string) => void;
    error?: string;
  }

export default function TextInput({
  string,
  placeholder,
  inputType,
  error,
  onUpdate,
}: TextInputCompTypes) {
  
  return (
    <>
    <label>
        {placeholder}
    </label>
    <input
          placeholder=""
          className="
            block
            w-full
            rounded-md
            border
            border-gray-300
            bg-[white]
            px-3
            py-2.5
            text-gray-800
            focus:outline-none
          "
          value={string || ""}
          onChange={(event) => onUpdate(event.target.value)}
          type={inputType}
          autoComplete="off"
        />

      <div className="text-[14px] font-semibold text-red-500">
        {error ? error : null}
      </div>
    </>
  );
}
