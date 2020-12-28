import React from "react";

const ModalActions: React.FC = ({ children }) => (
  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
    { children }
  </div>
)

export default ModalActions
