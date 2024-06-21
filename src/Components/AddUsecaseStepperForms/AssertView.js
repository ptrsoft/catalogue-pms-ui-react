"use client";
import { FileOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Import statements...

const AssetView = () => {
  const [data, setData] = useState({});
  const [openItemIndex, setOpenItemIndex] = useState(null);
  const [error, setError] = useState(null);
  const addUsecaseId = useSelector((state) => state.addUsecase.useCaseId);
  const projectId = useSelector((state) => state.addProject.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://m41stqhs8f.execute-api.us-east-1.amazonaws.com/dev/usecase/${addUsecaseId}/asset`
        );
        console.log("AssertView", response.data);
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [addUsecaseId]);

  const toggleAccordion = (index) => {
    setOpenItemIndex(index === openItemIndex ? null : index);
  };
//   const groupedDocuments = {};

//   // Group documents by name
//   Object.keys(data).forEach((key) => {
//     data[key].documents.forEach((document) => {
//       const name = document.name;
//       if (!groupedDocuments[name]) {
//         groupedDocuments[name] = [document];
//       } else {
//         // Check if the document with the same name already exists in the group
//         const existingDocument = groupedDocuments[name].find(
//           (doc) => doc.docName === document.docName
//         );
//         if (!existingDocument) {
//           groupedDocuments[name].push(document);
//         }
//       }
//     });
//   });

  return (
    <>
      <div>
        {/* {Object.keys(data).map((key, index) => (
                    <div key={index} className={`mb-8 ${openItemIndex === index ? 'border border-blue-500 p-5' : ''}`}>
                        <div className={`mb-8 ${openItemIndex === index ? 'flex justify-between items-center w-full h-12 bg-white rounded-lg pl-3' : 'flex justify-between items-center w-full h-12 bg-[#E6F7FF] rounded-lg pl-3'}`} >
                            <div className="flex gap-2">
                                <div className="bg-white flex items-center justify-center text-white border border-blue-400 w-8 rounded-full"><span className='bg-[#1890FF] w-6 h-6 text-center rounded-full'>{index + 1}</span></div>
                                <button onClick={() => toggleAccordion(index)} className='text-xl font-medium leading-7 text-left' >{key}</button>
                                <span className={`${data[key].status === 'incomplete' ? 'bg-[#FAAD14] px-2 py-1 rounded' : 'bg-lime-300 px-2 py-1 rounded'}`}>{data[key].status === 'incomplete' ? 'Incomplete' : 'Complete'}</span>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <p className="text-gray-400">Assigned Date:</p>
                                <p>{data[key].assigned_date}</p>
                                <p className="text-gray-400">Start Date:</p>
                                <p>{data[key].start_date}</p>
                                <p className="text-gray-400">Owner: {data[key].assigned_to}</p>
                                <img alt='' src='' className='rounded-full' />
                            </div>
                        </div>
                        {index === openItemIndex && (
                            <div className='bg-white mt-5'>
                                {data[key].documents.map((document, idx) => (
                                    <React.Fragment>
                                        <div key={idx} className="bg-[#E6F7FF] w-full h-12 mb-2 flex justify-between items-center px-4 rounded-md">
                                            <h2 className='text-xl font-semibold'>{document.name}</h2>
                                            <p className="text-gray-400">Assigned Date: <span className='text-black'>{data[key].assigned_date}</span></p>
                                        </div>
                                        <div className='p-3'>
                                            <p className='mb-3'>Attachment</p>
                                            <div className='flex'>
                                                <span className='border p-2 flex flex-col rounded-lg w-20 justify-center items-center space-y-3'>
                                                    <FileOutlined style={{ color: "#70c8f1", fontSize: "2rem" }} />
                                                    <p>{document.docName}</p>
                                                </span>
                                            </div>

                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                ))} */}
        {Object.keys(data).map((key, index) => {
          // Group documents by name for each key
          const groupedDocuments = {};
          data[key].documents.forEach((document) => {
            const name = document.name;
            if (!groupedDocuments[name]) {
              groupedDocuments[name] = [document];
            } else {
              // Check if the document with the same name already exists in the group
              const existingDocument = groupedDocuments[name].find(
                (doc) => doc.docName === document.docName
              );
              if (!existingDocument) {
                groupedDocuments[name].push(document);
              }
            }
          });

          return (
            <div
              key={index}
              className={`mb-8 ${
                openItemIndex === index ? "border border-blue-500 p-5" : ""
              }`}
            >
              <div
                className={`mb-8 ${
                  openItemIndex === index
                    ? "flex justify-between items-center w-full h-12 bg-white rounded-lg pl-3"
                    : "flex justify-between items-center w-full h-12 bg-[#E6F7FF] rounded-lg pl-3"
                }`}
              >
                <div className="flex gap-2">
                  <div className="bg-white flex items-center justify-center text-white border border-blue-400 w-8 rounded-full">
                    <span className="bg-[#1890FF] w-6 h-6 text-center rounded-full">
                      {index + 1}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="text-xl font-medium leading-7 text-left"
                  >
                    {key}
                  </button>
                  <span
                    className={`${
                        data[key].status === "inprogress"
                          ? "bg-[#ffbf3f88] px-2 py-1 rounded"
                          : data[key].status === "pending"
                          ? "bg-gray-400 px-2 py-1 rounded" // Change to your desired color for pending status
                          : data[key].status === "unassigned"
                          ? "bg-[#ffbf3f88] px-2 py-1 rounded" // Change to your desired color for pending status
                          : "bg-lime-300 px-2 py-1 rounded" // Default color for complete status
                      }`}
                  >
                    {data[key].status}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p className="text-gray-400">Assigned Date:</p>
                  <p>{data[key].assigned_date}</p>
                  <p className="text-gray-400">Start Date:</p>
                  <p>{data[key].start_date}</p>
                  <p className="text-gray-400">
                    Owner: {data[key].assigned_to}
                  </p>
                  <img alt="" src="" className="rounded-full" />
                </div>
              </div>
              {index === openItemIndex && (
                <div className="bg-white mt-5">
                  {/* Render the grouped documents for the current key */}
                  {Object.values(groupedDocuments).map((group, groupIndex) => (
                    <React.Fragment key={groupIndex}>
                      <div className="bg-[#E6F7FF] w-full h-12 mb-2 flex justify-between items-center px-4 rounded-md">
                        <h2 className="text-xl font-semibold">
                          {group[0].name}
                        </h2>
                        <p className="text-gray-400">
                          Assigned Date:{" "}
                          <span className="text-black">
                            {data[key].assigned_date}
                          </span>
                        </p>
                      </div>
                      <div className="p-3">
                        <p className="mb-3">Attachment</p>
                        <div className="flex">
                          {group.map((document, docIndex) => (
                            <span
                              key={docIndex}
                              className="border p-2 flex flex-col rounded-lg w-20 justify-center items-center space-y-3 mr-3"
                            >
                              <FileOutlined
                                style={{ color: "#70c8f1", fontSize: "2rem" }}
                              />
                              <p>{document.docName}</p>
                            </span>
                          ))}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Hardcoded data */}
      {/* <div className="bg-blue-100 flex justify-between items-center w-full h-12 mb-8">
                <div className="flex gap-2">
                    <span className="bg-sky-700 px-2 py-1 ml-1 rounded-full text-white">2</span>
                    <h3>Mock Development</h3>
                    <span className="bg-yellow-200 px-2 py-1 rounded">In Progress</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                    <p className="text-gray-400">Assigned Date:</p>
                    <p>12/03/2024</p>
                    <p className="text-gray-400">Start Date:</p>
                    <p>18/03/2024</p>
                    <p className="text-gray-400">Owner: Siddhesh</p>
                    <img alt='' src='' className='rounded-full' />
                </div>
            </div>
            <div className="bg-blue-100 flex justify-between items-center w-full h-12 mb-8">
                <div className="flex gap-2">
                    <span className="bg-sky-700 px-2 py-1 ml-1 rounded-full text-white">3</span>
                    <h3>Actual Development</h3>
                    <span className="bg-gray-50 px-2 py-1 rounded">Pending</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                    <p className="text-gray-400">Assigned Date:</p>
                    <p>12/03/2024</p>
                    <p className="text-gray-400">Start Date:</p>
                    <p>18/03/2024</p>
                    <p className="text-gray-400">Owner: Siddhesh</p>
                    <img alt='' src='' className='rounded-full' />
                </div>
            </div> */}
    </>
  );
};

export default AssetView;
