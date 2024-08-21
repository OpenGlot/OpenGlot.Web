import React, { useState } from 'react';
import { handleUploadFiles } from 'services';

const LessonFilesUpload = () => {
  const [audioCsvFile, setAudioCsvFile] = useState(null);
  const [imageCsvFile, setImageCsvFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleAudioCsvChange = (event:any) => {
    setAudioCsvFile(event.target.files[0]);
  };

  const handleImageCsvChange = (event:any) => {
    console.log(event.target,"target file")
    setImageCsvFile(event.target.files[0]);
  };

  const handleCsvUpload = async (csvFile:File|null, uploadEndpoint:string) => {
    if (csvFile) {
      setUploadStatus('Uploading CSV file...');
      try {
        await handleUploadFiles([csvFile], uploadEndpoint); // Pass the file directly
        setUploadStatus('CSV file uploaded successfully!');
      } catch (error) {
        setUploadStatus('Failed to upload CSV file.');
      }
    } else {
      setUploadStatus('Please select a CSV file to upload.');
    }
  };
  

  const handleAudioCsvUpload = () => {
    handleCsvUpload(audioCsvFile, '/upload-audio');
  };

  const handleImageCsvUpload = () => {
    handleCsvUpload(imageCsvFile, '/upload-images');
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Upload Lesson Files</h2>

      {/* Audio CSV Upload Section */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Upload Audio CSV File</h3>
        <input
          type="file"
          accept=".csv"
          onChange={handleAudioCsvChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        <button
          onClick={handleAudioCsvUpload}
          className="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
          Upload Audio CSV
        </button>
      </div>

      {/* Image CSV Upload Section */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Upload Image CSV File</h3>
        <input
          type="file"
          accept=".csv"
          onChange={handleImageCsvChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />
        <button
          onClick={handleImageCsvUpload}
          className="mt-2 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Upload Image CSV
        </button>
      </div>

      <div className="text-center text-sm text-gray-600 mt-4">
        {uploadStatus}
      </div>
    </div>
  );
};

export default LessonFilesUpload;
