import { useStore } from '../../store/useStore';

const ContentModeration = () => {
  const { pendingContent, approveContent } = useStore();

  const handleApprove = (id) => {
    approveContent(id);
    alert('Content approved successfully!');
  };

  const handleReject = (id) => {
    approveContent(id);
    alert('Content rejected successfully!');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pending Content</h2>
      <div className="space-y-4">
        {pendingContent.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center text-gray-500 dark:text-gray-300">
            No pending content to review
          </div>
        ) : (
          pendingContent.map((content) => (
            <div key={content.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      content.type === 'tip' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {content.type}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-300">by {content.author}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{content.description}</p>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => handleApprove(content.id)}
                    className="btn btn-primary btn-accent-green px-4 py-2 rounded whitespace-nowrap"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(content.id)}
                    className="btn btn-accent px-4 py-2 rounded whitespace-nowrap"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContentModeration;
