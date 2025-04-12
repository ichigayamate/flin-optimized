import Input from "@/lib/components/input";
import { backend } from "@/lib/scripts/backend";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  name: string;
  phoneNumber: string;
  email: string;
  loanType: string;
};

export default function InquiryPage() {
  const { register, handleSubmit, control, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const formPromise = backend
      .post("/leads", data)
      .then(() => {
        reset();
      })
    await toast.promise(formPromise, {
      loading: "Submitting...",
      success: "Inquiry submitted successfully!",
      error: (err) => {
        if (err.response?.data?.status !== 400) {
          return "An error occurred. Please try again.";
        }
        return "";
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center p-4">
      <div className="flex flex-col gap-4 w-full max-w-[1000px]">
        <h1 className="text-3xl font-bold mb-4">Inquiry Form</h1>
        <Input
          control={control}
          name="name"
          type="text"
          placeholder="Name"
          required
        />
        <Input
          control={control}
          name="phoneNumber"
          type="tel"
          placeholder="Phone"
          required
        />
        <Input
          control={control}
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <select
          defaultValue=""
          className="border border-neutral-300 px-2 py-2 rounded"
          {...register("loanType", { required: true })}
          required
        >
          <option value="" disabled>
            Select Loan Type
          </option>
          <option value="Personal Loan">Personal Loan</option>
          <option value="Credit">Credit Card</option>
          <option value="Paylater">Paylater</option>
        </select>
        <button type="submit" className="btn btn-primary mt-4">
          Submit Inquiry
        </button>
      </div>
    </form>
  );
}
