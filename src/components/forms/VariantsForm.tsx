import { Plus, Trash2, X } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import formStateAtom from "../../atoms/formStateAtom";
import { z } from "zod";
import { useRecoilState } from "recoil";
import { zodResolver } from "@hookform/resolvers/zod";

const VariantsForm = forwardRef((_, ref) => {
  const [name, setKey] = useState("");
  const [value, setValue] = useState("");
  const [formState, setFormState] = useRecoilState(formStateAtom);
  const [optionData, setOptionData] = useState(formState.variants || []);

  const variantsSchema = z.object({
    variants: z.array(
      z.object({ name: z.string(), values: z.array(z.string()) })
    ),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(variantsSchema),
    defaultValues: { variants: formState.variants },
  });

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      variants: optionData,
    }));
  }, [optionData, setFormState]);

  const handleAddOption = () => {
    if (optionData.some((option) => option.name === name)) {
      toast.error("This option already exists");
      return;
    }

    if (name && value) {
      const valuesArray = value.split(",").map((val) => val.trim());
      setOptionData((prev) => [...prev, { name, values: valuesArray }] as any);
      setKey("");
      setValue("");
    } else {
      toast.error("Option can't be empty");
    }
  };

  const handleRemoveValue = (keyToRemove: string, valueToRemove: string) => {
    setOptionData((prev) => {
      return prev.map((option) => {
        if (option.name === keyToRemove && option.values.length > 1) {
          return {
            ...option,
            values: option.values.filter((val) => val !== valueToRemove),
          };
        }
        return option;
      });
    });
  };

  const handleKeyValueRemoval = (keyToRemove: string) => {
    setOptionData((prev) =>
      prev.filter((option) => option.name !== keyToRemove)
    );
  };

  const onSubmit = () => {
    if (optionData.length === 0) {
      toast.error("Please add at least one variant option");
      return;
    }
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
    formState: { errors },
  }));

  return (
    <div className="w-[500px] mt-8 shadow-[0px_0px_20px_-2px_#0000001A] p-4 rounded-xl">
      <h2 className="font-semibold">Variants</h2>

      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm block" htmlFor="option">
              Option <sup>*</sup>
            </label>
            <label className="text-sm block" htmlFor="values">
              Values <sup>*</sup>
            </label>
          </div>
          {optionData.map(({ name, values }) => (
            <div key={name} className="my-2 flex items-center gap-3">
              <div className="font-medium border-[1px] border-gray-200 px-4 py-2 text-black rounded-md text-sm w-[45%]">
                {name}
              </div>
              <div className="flex flex-wrap gap-2 font-medium border-[1px] border-gray-200 px-1 py-1 text-black text-base rounded-md w-[45%]">
                {values.map((val) => (
                  <div
                    key={val}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md flex items-center text-xs min-w-5"
                    onClick={() => handleRemoveValue(name, val)}
                  >
                    <span>{val}</span>
                    <button className="text-gray-700">
                      <X width={14} height={14} />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => handleKeyValueRemoval(name)}>
                <Trash2 width={18} height={18} className="text-red-500" />
              </button>
            </div>
          ))}

          <div className="flex items-center gap-3">
            <input
              className="border-[1px] border-gray-200 w-[45%] px-4 py-2 text-black text-base rounded-md mt-2"
              placeholder="Size"
              value={name}
              onChange={(e) => setKey(e.target.value)}
            />

            <input
              className="border-[1px] border-gray-200 w-[45%] px-4 py-2 text-black text-base rounded-md mt-2"
              placeholder="Comma separated values"
              value={value}
              id="values"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>

        <button
          type="button"
          className="text-sky-500 font-medium flex items-center gap-1 mt-2"
          onClick={handleAddOption}
        >
          <Plus width={18} height={18} /> Add Option
        </button>
      </form>
    </div>
  );
});

export default VariantsForm;
