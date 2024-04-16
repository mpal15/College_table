// eslint-disable-next-line no-unused-vars
import React  from 'react';
import data from "./data.json";
import TableComponent from './Components/TableComponent';

const App = () => {

  return (
    <div className="mx-auto p-4 bg-gray-100">
  <h1 className="text-2xl font-bold mb-4">College Table</h1>
  <TableComponent data={data} />
</div>
  );
};

export default App;


