import { useRecoilState, useResetRecoilState } from "recoil";
import Layout from "../Layout/Layout";
import currentStepState from "../../atoms/currentStepAtom";
import DescriptionForm from "../forms/DescriptionForm";
import VariantsForm from "../forms/VariantsForm";
import CombinationsForm from "../forms/CombinationsForm";
import PriceInfoForm from "../forms/PriceInfoForm";
import formStateAtom from "../../atoms/formStateAtom";
import FormProgress from "../forms/FormProgress";
import { useRef } from "react";
import toast from "react-hot-toast";
import productState from "../../atoms/productAtom";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepState);
  const [formState, setFormState] = useRecoilState(formStateAtom);
  const resetFormState = useResetRecoilState(formStateAtom);
  const [products, setProducts] = useRecoilState(productState);
  const descriptionFormRef = useRef<any>(null);
  const variantsFormRef = useRef<{ submit: () => boolean }>(null);
  const combinationsFormRef = useRef<any>(null);
  const priceInfoFormRef = useRef<any>(null);
  const navigate = useNavigate();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <DescriptionForm ref={descriptionFormRef} />;
      case 2:
        return <VariantsForm ref={variantsFormRef} />;
      case 3:
        return <CombinationsForm ref={combinationsFormRef} />;
      case 4:
        return <PriceInfoForm ref={priceInfoFormRef} />;
      default:
        return <DescriptionForm ref={descriptionFormRef} />;
    }
  };

  const handleCancel = () => {
    resetFormState();
    setCurrentStep(1);
  };

  const handleNext = async () => {
    try {
      switch (currentStep) {
        case 1:
          await descriptionFormRef.current.submit();
          const isValid1 =
            Object.keys(descriptionFormRef.current.formState.errors).length ===
            0;
          if (isValid1) {
            setCurrentStep(currentStep + 1);
          }
          break;
        case 2:
          setCurrentStep(currentStep + 1);
          break;
        case 3:
          await combinationsFormRef.current.submit();
          const isValid3 =
            Object.keys(combinationsFormRef.current.formState.errors).length ===
            0;
          if (isValid3) {
            setCurrentStep(currentStep + 1);
          }
          break;
        case 4:
          await priceInfoFormRef.current.submit();
          const isValid4 =
            Object.keys(priceInfoFormRef.current.formState.errors).length === 0;
          if (isValid4) {
            setFormState((prev) => ({
              ...prev,
              priceINR: formState.priceINR,
              discount: formState.discount,
            }));

            setProducts([...products, formState]);
            console.log(formState);
            resetFormState();
            setCurrentStep(1);
            navigate("/products");
            toast.success(
              "Product added successfully. Check console for details."
            );
          }
          break;
      }
    } catch (error) {
      console.error("Form validation failed", error);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-6">Add Product</h1>
        <div>
          <button
            className="bg-gray-200 text-sky-600 px-12 py-2 rounded-md font-medium mr-4"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            className="bg-sky-600 text-white px-12 py-2 rounded-md font-medium"
            onClick={handleNext}
          >
            {currentStep === 4 ? "Confirm" : "Next"}
          </button>
        </div>
      </div>

      <FormProgress />

      {/* ----- Form Renderer ----- */}
      {renderStep()}
    </Layout>
  );
};

export default AddProduct;
