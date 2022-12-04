import React from "react";

const ModalActions: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse space-y-2 sm:space-y-0">
    { children }
  </div>
)

export default ModalActions
