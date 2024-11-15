import React from "react";

export default function SearchBar({ searchQuery, setSearchQuery }: { 
  searchQuery: string; 
  setSearchQuery: (query: string) => void;
}) {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search exercises..."
      className="w-full p-2 border border-gray-300 rounded-md mb-4"
    />
  );
}
