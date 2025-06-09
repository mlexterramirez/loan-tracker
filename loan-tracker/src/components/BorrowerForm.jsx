import { useForm } from 'react-hook-form';

const BorrowerForm = () =>({ onSubmit }) =>{
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Full Name</label>
        <input
          {...register('fullName', { required: true })}
          className="w-full p-2 border rounded"
        />
        {errors.fullName && <span className="text-red-500">Required</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Home Address</label>
          <input
            {...register('homeAddress', { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.homeAddress && <span className="text-red-500">Required</span>}
        </div>
        <div>
          <label className="block mb-1">Work Address (Optional)</label>
          <input
            {...register('workAddress')}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Primary Contact</label>
          <input
            {...register('primaryContact', { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.primaryContact && <span className="text-red-500">Required</span>}
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register('contactEmail', { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.contactEmail && <span className="text-red-500">Required</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Reference 1 Name</label>
          <input
            {...register('referenceContact1.name', { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Reference 1 Contact</label>
          <input
            {...register('referenceContact1.contact', { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Reference 2 Name (Optional)</label>
          <input
            {...register('referenceContact2.name')}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Reference 2 Contact (Optional)</label>
          <input
            {...register('referenceContact2.contact')}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Borrower
      </button>
    </form>
  );
};
export default BorrowerForm;