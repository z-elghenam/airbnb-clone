import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path,
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const Input = <T extends FieldValues>({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}: InputProps<T>) => {
  return (
    <div className="relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-1/2 left-2"
        />
      )}
      <label
        className={`text-lg font-semibold ${
          errors[id] ? "text-rose-500" : "text-zinc-500"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        className={`peer w-full p-4 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
          ${formatPrice ? "pl-9" : "pl-4"} 
          ${
            errors[id]
              ? "border-rose-500 focus:border-rose-500"
              : "border-neutral-300 focus:border-neutral-700"
          }`}
      />
    </div>
  );
};

export default Input;

// import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
// import { BiDollar } from "react-icons/bi";

// interface InputProps {
//   id: string;
//   label: string;
//   type?: string;
//   disabled?: boolean;
//   formatPrice?: boolean;
//   required?: boolean;
//   register: UseFormRegister<FieldValues>;
//   errors: FieldErrors;
// }

// const Input = ({
//   id,
//   label,
//   type,
//   disabled,
//   formatPrice,
//   required,
//   register,
//   errors,
// }: InputProps) => {
//   return (
//     <div>
//       {formatPrice && (
//         <BiDollar
//           size={24}
//           className="text-neutral-700 absolute top-1/2 left-2"
//         />
//       )}
//       <label
//         className={`text-lg font-semibold ${
//           errors[id] ? "text-rose-500" : "text-zinc-500"
//         }`}
//       >
//         {label}
//       </label>
//       <input
//         type={type}
//         id={id}
//         disabled={disabled}
//         {...register(id, { required })}
//         placeholder=""
//         className={`peer w-full p-4 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
//           ${formatPrice ? "pl-9" : "pl-4"}
//           ${
//             errors[id]
//               ? "border-rose-500 focus:border-rose-500"
//               : "border-neutral-300 focus:border-neutral-700"
//           }`}
//       />
//     </div>
//   );
// };

// export default Input;
