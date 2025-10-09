import React, { memo } from 'react';
import { Badge } from './ui/badge';

const SkillsSection = ({ skills }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {
          skills.length > 0 ? skills.map((item, index) =>
            <Badge
              key={index}
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors px-3 py-1.5 font-medium border border-blue-200"
            >
              {item}
            </Badge>
          ) : <span className="text-gray-500">No skills added yet</span>
        }
      </div>
    </div>
  );
}

export default memo(SkillsSection);
