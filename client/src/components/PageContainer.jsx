export default function PageContainer({ title, children }) {
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white bg-opacity-70 backdrop-blur-xl p-10 shadow-2xl rounded-3xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          {title}
        </h2>
        <div className="text-gray-700 text-lg text-center">
          {children}
        </div>
      </div>
    </div>
  );
}
