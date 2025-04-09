const Overlay = ({ visible, children }) => {
    if (!visible) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-xl shadow-2xl">
          {children}
        </div>
      </div>
    );
  };
  
  export default Overlay;
  