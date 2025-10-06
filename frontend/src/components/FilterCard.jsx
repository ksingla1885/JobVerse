/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem} from './ui/radio-group';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Filter, ChevronDown, MapPin, Briefcase, DollarSign } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, clearFilters } from '../redux/jobSlice';

const FilterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Pune", "Hyderabad", "Mumbai", "Chennai", "Kolkata"],
    icon: MapPin
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer", "Data Scientist", "UI/UX Designer"],
    icon: Briefcase
  },
  {
    filterType: "Salary",
    array: ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA", "15+ LPA"],
    icon: DollarSign
  }
];

const FilterCard = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    industry: "",
    salary: ""
  });
  const dispatch = useDispatch();
  const { filters } = useSelector(store => store.job);

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? "" : value
    }));
  };

  const handleApplyFilters = () => {
    // Apply each selected filter
    Object.entries(selectedFilters).forEach(([filterType, value]) => {
      if (value) {
        dispatch(setFilter({ filterType, value }));
      }
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      location: "",
      industry: "",
      salary: ""
    });
    dispatch(clearFilters());
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Filter Jobs</h2>
        </div>
      </div>

      {/* Filter Content */}
      <div className="p-4 space-y-4">
        {FilterData.map((data, index) => {
          const Icon = data.icon;
          const isExpanded = expandedSections[index];

          return (
            <div key={index} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto text-left"
                onClick={() => toggleSection(index)}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-gray-900">{data.filterType}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </Button>

              {isExpanded && (
                <div className="mt-3 space-y-2 pl-6">
                  <RadioGroup
                    value={selectedFilters[data.filterType.toLowerCase()]}
                    onValueChange={(value) => handleFilterChange(data.filterType.toLowerCase(), value)}
                  >
                    {data.array.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2 group">
                        <RadioGroupItem
                          value={item}
                          id={`${data.filterType}-${itemIndex}`}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <Label
                          htmlFor={`${data.filterType}-${itemIndex}`}
                          className="text-sm text-gray-700 cursor-pointer group-hover:text-blue-600 transition-colors flex-1"
                        >
                          {item}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>
          );
        })}

        {/* Apply Filters Button */}
        <div className="pt-4 border-t border-gray-100 space-y-2">
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
          {Object.values(selectedFilters).some(value => value) && (
            <Button
              variant="outline"
              className="w-full text-gray-600 border-gray-300 hover:bg-gray-50"
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterCard
