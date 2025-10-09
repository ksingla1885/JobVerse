import React, { memo } from 'react';
import { Mail, Contact } from 'lucide-react';

const ContactInfo = ({ user }) => {
  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <Mail className="h-5 w-5 text-blue-600" />
        <span className="text-gray-700">{user?.email}</span>
      </div>
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <Contact className="h-5 w-5 text-blue-600" />
        <span className="text-gray-700">{user?.phoneNumber}</span>
      </div>
    </div>
  );
}

export default memo(ContactInfo);
