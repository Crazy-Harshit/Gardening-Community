import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useForm } from 'react-hook-form';

const TipSharing = () => {
  const { tips, addTip } = useStore();
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const newTip = {
      title: data.title,
      description: data.description,
      author: 'Current User',
      photos: []
    };
    
    addTip(newTip);
    alert('Tip shared successfully!');
    reset();
    setShowForm(false);
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {showForm ? 'Cancel' : 'Share New Tip'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Share a Gardening Tip</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
              <input
                {...register('title', { required: true })}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Enter tip title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
              <textarea
                {...register('description', { required: true })}
                rows={4}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Describe your gardening tip"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit Tip
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Community Tips</h3>
        {tips.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center text-gray-500 dark:text-gray-300">
            No tips yet. Be the first to share!
          </div>
        ) : (
          tips.map((tip) => (
            <div key={tip.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{tip.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{tip.description}</p>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Shared by {tip.author} on {new Date(tip.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TipSharing;
