import React, { forwardRef, useImperativeHandle } from "react";
import { useRecoilState } from "recoil";
import { useForm, Controller, useWatch } from "react-hook-form";
import formStateAtom from "../../atoms/formStateAtom";
import getUniqueCombinations from "../../utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { cn } from "../../lib/tailwind";

interface FormData {
  combinations: string[][];
  sku: string[];
  inStock: boolean[];
  quantity: number[];
}

const combinationsSchema = z.object({
  sku: z.array(z.string().min(1, "SKU is required")),
  inStock: z.array(z.boolean()),
  quantity: z.array(z.number().optional()),
});

const CombinationsForm = forwardRef((_, ref) => {
  const [formState, setFormState] = useRecoilState(formStateAtom);

  const combinations = React.useMemo(
    () => getUniqueCombinations(formState?.variants) || [],
    [formState?.variants]
  );
  const skus = Object.keys(formState.combinations).map(
    (key) => formState.combinations[key].sku
  );
  const inStocks = Object.keys(formState.combinations).map(
    (key) => formState.combinations[key].inStock
  );
  const quantities = Object.keys(formState.combinations).map(
    (key) => formState.combinations[key].quantity
  );

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(combinationsSchema),
    defaultValues: {
      combinations: combinations.length > 0 ? combinations : [],
      sku: skus.length > 0 ? skus : Array(combinations.length).fill(""),
      inStock:
        inStocks.length > 0 ? inStocks : Array(combinations.length).fill(true),
      quantity:
        quantities.length > 0 ? quantities : Array(combinations.length).fill(0),
    },
  });

  // Watch the inStock values
  const inStockValues = useWatch({
    control,
    name: "inStock",
  });

  const onSubmit = (data: FormData) => {
    if (data.sku.some((sku) => !sku)) {
      toast.error("All SKUs must be filled");
      return;
    }

    data.sku.forEach((sku, index) => {
      const firstIndex = data.sku.indexOf(sku);
      if (firstIndex !== index) {
        setError(`sku.${index}`, {
          type: "manual",
          message: "SKU must be unique",
        });
        return;
      }
    });

    data.sku.forEach((_, index) => {
      if (data.inStock[index] && data.quantity[index] < 0) {
        setError(`quantity.${index}`, {
          type: "manual",
          message: "Quantity must be greater than 0",
        });

        return;
      }
    });

    const combinationsMap: { [key: string]: any } = {};

    combinations.forEach((combination, index) => {
      const key = String.fromCharCode(97 + index);
      combinationsMap[key] = {
        name: combination.join("/"),
        sku: data.sku[index],
        quantity: data.quantity[index] || null,
        inStock: data.inStock[index],
      };
    });

    setFormState((prev) => ({
      ...prev,
      combinations: combinationsMap as any,
    }));
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
    formState: { errors },
  }));

  return (
    <div className="w-[500px] mt-8 shadow-[0px_0px_20px_-2px_#0000001A] p-4 rounded-xl">
      <h2 className="font-semibold">Combinations</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 grid grid-cols-6 grid-rows-auto gap-4 place-items-center">
          {/* Col 1: Combinations */}
          <div className="space-y-2">
            <div className="h-7" />
            {combinations.map((combination, i) => (
              <p key={i} className="h-10 flex items-center">
                {combination.join("/")}
              </p>
            ))}
          </div>

          {/* Col 2: SKU */}
          <div className="col-span-2 space-y-2">
            <label className="text-sm block h-7">
              SKU <sup>*</sup>
            </label>
            {combinations.map((_, i) => (
              <div key={i} className="relative">
                <Controller
                  name={`sku.${i}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`border-[1px] h-10 border-gray-200 w-full px-2 text-black text-base rounded-md ${
                        errors.sku?.[i] ? "border-red-500" : ""
                      }`}
                    />
                  )}
                />
                {errors.sku?.[i] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.sku[i]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Col 3: In Stock */}
          <div className="space-y-2">
            <label className="text-sm block h-7">In Stock</label>
            <div className="flex flex-col items-center space-y-2">
              {combinations.map((_, i) => (
                <div key={i} className="h-10 flex items-center">
                  <Controller
                    key={i}
                    name={`inStock.${i}`}
                    control={control}
                    render={({ field: { value } }) => (
                      <button
                        type="button"
                        className={`w-10 h-6 flex items-center rounded-full p-1 transition duration-300 ease-in-out ${
                          value ? "bg-black" : "bg-gray-300"
                        }`}
                        onClick={() => setValue(`inStock.${i}`, !value)}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ease-in-out ${
                            value ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Quantity */}
          <div className="col-span-2  space-y-2">
            <label className="text-sm block h-7">Quantity</label>
            {combinations.map((_, i) => (
              <div key={i}>
                <Controller
                  name={`quantity.${i}`}
                  control={control}
                  render={({ field }) => {
                    const isInStock = inStockValues?.[i] ?? true;
                    return (
                      <input
                        {...field}
                        type="number"
                        disabled={!isInStock}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className={cn(
                          "border-[1px] h-10 border-gray-200 w-full px-2 text-black text-base rounded-md",
                          errors.quantity?.[i] ? "border-red-500" : "",
                          !isInStock
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : ""
                        )}
                      />
                    );
                  }}
                />
                {errors.quantity?.[i] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.quantity[i]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
});

export default CombinationsForm;
