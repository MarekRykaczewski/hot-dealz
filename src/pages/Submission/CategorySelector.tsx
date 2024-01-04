import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { fetchCategories } from "../../api/firebase/deals";
import { Category } from "../../types";

function CategorySelector({
  handleInputChange,
}: {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { register, formState } = useFormContext();
  const { errors } = formState;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };

    fetchData();
  }, []);

  const checkboxElements = categories.map((category, index) => (
    <div key={category.id}>
      <input
        {...register("category", { required: "This is required." })}
        value={category.title}
        onClick={(e) => handleInputChange(e as any)}
        name="category"
        className="peer hidden"
        id={`category-${index}`}
        type="radio"
      />
      <label
        className="flex items-center gap-2 peer-checked:bg-orange-100 peer-checked:text-orange-500 peer-checked:border-orange-500 transition font-bold text-slate-500 border rounded-xl py-1 px-5 w-fit"
        htmlFor={`category-${index}`}
      >
        <span>{category.title}</span>
      </label>
    </div>
  ));

  return (
    <div>
      <fieldset className="flex flex-wrap mb-0 gap-3">
        {checkboxElements}
      </fieldset>
      {errors.category && (
        <span className="text-sm text-red-500 mt-1">
          {errors.category.message as any}
        </span>
      )}
    </div>
  );
}

export default CategorySelector;
