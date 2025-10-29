import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useForm } from 'react-hook-form';

const ProjectManagement = () => {
  const { projects, addProject, updateProject } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const progressValue = watch('progress', 0);

  const onSubmit = (data) => {
    if (editingProject) {
      updateProject(editingProject.id, data);
      alert('Project updated successfully!');
    } else {
      addProject(data);
      alert('Project created successfully!');
    }
    reset();
    setShowForm(false);
    setEditingProject(null);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setValue('name', project.name);
    setValue('description', project.description);
    setValue('progress', project.progress);
    setShowForm(true);
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => {
            setEditingProject(null);
            reset({ name: '', description: '', progress: 0 });
            setShowForm(!showForm);
          }}
          className="btn btn-primary btn-accent-green px-4 py-2 rounded"
        >
          {showForm ? 'Cancel' : 'Create New Project'}
        </button>
      </div>

      {showForm && (
        <div className="glass-card p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            {editingProject ? 'Update Project' : 'Create New Project'}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="form-label">Project Name</label>
              <input
                {...register('name', { required: true })}
                className="form-input"
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label className="form-label">Description</label>
              <textarea
                {...register('description', { required: true })}
                rows={4}
                className="form-input"
                placeholder="Describe your project"
              />
            </div>
            <div>
              <label className="form-label mb-2">
                Progress: {progressValue}%
              </label>
              <input
                type="range"
                {...register('progress')}
                min="0"
                max="100"
                defaultValue="0"
                className="w-full accent-green"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-accent-green px-4 py-2 rounded"
            >
              {editingProject ? 'Update' : 'Create'} Project
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.length === 0 ? (
          <div className="col-span-2 glass-card p-6 text-center text-muted">
            No projects yet. Create your first project!
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="glass-card p-6">
              <h4 className="text-lg font-semibold mb-2 text-foreground">{project.name}</h4>
              <p className="text-muted mb-4">{project.description}</p>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted">Progress</span>
                  <span className="text-accent-green font-semibold">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="progress-fill rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <button
                onClick={() => handleEdit(project)}
                className="text-accent-green hover:text-primary-green font-medium"
              >
                Update Progress
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;
