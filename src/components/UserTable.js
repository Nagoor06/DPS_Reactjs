import React, { useState } from 'react';

const UserTable = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = users.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(users.length / entriesPerPage);

  return (
    <>
      <table className="min-w-full bg-white rounded shadow-md">
        <thead className="bg-sky-400 text-white">
          <tr>
          <th className="py-2 px-4 border-b">Id</th>
            <th className="py-2 px-4 border-b">Full Name</th>
            <th className="py-2 px-4 border-b">City</th>
            <th className="py-2 px-4 border-b">Birthday</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((user, index) => (
            <tr
              key={user.id}
              className={`${user.highlight ? 'bg-sky-200' : ''}`}
            >
              <td className="py-2 px-4 border-b text-center">{user.id}</td>
              <td className="py-2 px-4 border-b text-center">
                {user.firstName} {user.lastName}
              </td>
              <td className="py-2 px-4 border-b text-center">{user.city}</td>
              <td className="py-2 px-4 border-b text-center">{new Date(user.birthDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex list-none">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className="mx-1">
                <button
                  className={`py-2 px-4 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default UserTable;
