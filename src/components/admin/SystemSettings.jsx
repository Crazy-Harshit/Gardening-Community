import { useForm } from 'react-hook-form';
import { useStore } from '../../store/useStore';

const SystemSettings = () => {
  const { settings, updateSettings } = useStore();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    updateSettings(data);
    alert('Settings updated successfully!');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-2xl">
      <h2 className="text-xl font-semibold mb-4 text-foreground">System Configuration</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Site Name
          </label>
          <input
            {...register('siteName')}
            defaultValue={settings.siteName}
            className="block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('maintenanceMode')}
            defaultChecked={settings.maintenanceMode}
            className="w-4 h-4"
          />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Enable Maintenance Mode
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('allowRegistration')}
            defaultChecked={settings.allowRegistration}
            className="w-4 h-4"
          />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Allow New User Registration
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-accent-green px-6 py-2 rounded"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default SystemSettings;
