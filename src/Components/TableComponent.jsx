// eslint-disable-next-line no-unused-vars
import React ,{useState,useEffect} from 'react'


// eslint-disable-next-line react/prop-types
const TableComponent = ({ data }) => {
    const [colleges, setColleges] = useState(data);
    const [sortedBy, setSortedBy] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [visibleRows, setVisibleRows] = useState(10);
  
    const handleSort = (criteria) => {
      const sortedColleges = [...colleges].sort((a, b) => {
        if (criteria === 'fees' || criteria === 'userReviewRating') {
          return a[criteria] - b[criteria];
        } else {
          return a[criteria].localeCompare(b[criteria]);
        }
      });
      setColleges(sortedBy === criteria ? sortedColleges.reverse() : sortedColleges);
      setSortedBy(criteria);
    };
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    useEffect(() => {
      // eslint-disable-next-line react/prop-types
      const filteredColleges = data.filter(college =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setColleges(filteredColleges);
    }, [searchTerm, data]);
  
    const loadMore = () => {
      setVisibleRows(prevVisibleRows => prevVisibleRows + 10);
    };
  
    return (
        <div className="w-full">
        <input type="text" placeholder="Search by college name" value={searchTerm} onChange={handleSearch} className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-500">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border border-gray-500">CD Rank</th>
                <th className="px-4 py-2 border border-gray-500">College Name</th>
                <th onClick={() => handleSort('collegeDuniaRating')} className="cursor-pointer px-4 py-2 border border-gray-500">College Dunia Rating</th>
                <th onClick={() => handleSort('fees')} className="cursor-pointer px-4 py-2 border border-gray-500">Fees</th>
                <th onClick={() => handleSort('userReviewRating')} className="cursor-pointer px-4 py-2 border border-gray-500">User Review Rating</th>
                <th className="px-4 py-2 border border-gray-500">Featured</th>
              </tr>
            </thead>
            <tbody>
              {colleges.slice(0, visibleRows).map(college => (
                <tr key={college.id} className={college.featured ? 'bg-yellow-100' : ''}>
                  <td className="px-4 py-2 border border-gray-500">#{college.id}</td>
                  <td className="px-4 py-2 border border-gray-500">{college.name}</td>
                  <td className="px-4 py-2 border border-gray-500">{college.collegeDuniaRating}</td>
                  <td className="px-4 py-2 border border-gray-500">{college.fees}</td>
                  <td className="px-4 py-2 border border-gray-500">{college.userReviewRating}</td>
                  <td className="px-4 py-2 border border-gray-500">{college.featured ? 'Featured' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {visibleRows < colleges.length && (
          <button onClick={loadMore} className="block mx-auto mt-4 px-4 py-2 text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600">Load More</button>
        )}
      </div>
      
    );
  };

export default TableComponent