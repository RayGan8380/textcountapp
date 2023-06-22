'use client';
import React from 'react';
import { useState, useRef } from "react";
import uploadFiles from "../app/api/uploadFiles";
import { countWords } from "../app/api/wordCount";


const DragDropFiles = () => {
  const [files, setFiles] = useState(null);
  const [results, setResults] = useState(null); // New state to store the results
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
  
    if (!files) {
      return;
    }
  
    const uploadResponse = await uploadFiles(files);
  
    let resultString = '';
  
    for (let i = 0; i < uploadResponse.length; i++) {
      const fileData = uploadResponse[i];
      const fileContent = await readFileContent(fileData.url);
  
      const sortedUsers = countWords(fileContent);
  
      resultString += `${fileData.name}\n`;
  
      for (let j = 0; j < sortedUsers.length; j++) {
        const [username, words] = sortedUsers[j];
        resultString += `${j + 1}. ${username} - ${words} words\n`;
      }
  
      if (i !== uploadResponse.length - 1) {
        resultString += '\n'; // Add a new line between file results
      }
    }
  
    setResults(resultString);
  };
  

// Modify the readFileContent function to fetch the file content using the file URL
const readFileContent = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl);
      const text = await response.text();
      return text;
    } catch (error) {
      console.error('Error:', error);
      return '';
    }
  };

  return (
    <div className="container h-96 py-10 flex md:flex-row mx-auto flew-col">
      <div
        className="mx-8 lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 text-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="overflow-auto h-full py-10 border-2  border-gray-200 border-opacity-60 rounded-lg">
          {files ? (
            <ul>
              {Array.from(files).map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          ) : (
            <>
              <h1 className="py-5">Drag and drop your files to upload</h1>
              <h1 className="py-5">or</h1>
            </>
          )}
          <input
            type="file"
            multiple
            onChange={(event) => setFiles(event.target.files)}
            hidden
            ref={inputRef}
          />
            <button onClick={() => inputRef.current.click()}  className="\ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Select Files</button>
                </div>
                <div className="py-5">
                    <button onClick={handleOnSubmit} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
                </div>
            </div>
            
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 text-center">
                <div className="py-10 overflow-auto h-full border-2 border-gray-200 border-opacity-60 rounded-lg">
                {results ? (
                            <pre>
                                {results.split('\n').map((line, index) => (
                                <div key={index}>{line}</div>
                                ))}
                            </pre>
                            ) : (
                            <h1>Results will be showing here.</h1>
                )}
                </div>
            </div>

        </div>
            
       
    );

}

export default DragDropFiles;