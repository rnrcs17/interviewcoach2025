// file-upload.tsx

import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

registerPlugin(FilePondPluginFileValidateType);

interface FileUploadProps {
  onUploadResponse: (response: {
    parsedText: string;
    originalFileName: string;
  }) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadResponse }) => {
  const FilePondLanguage = {
    labelIdle: `Drag & Drop your resume file or
        <span class="filepond--label-action">Browse</span>.`,
  };

  return (
    <div>
      <FilePond
        {...FilePondLanguage}
        server={{
          process: {
            url: "/api/upload",
            method: "POST",
            onload: (response) => {
              onUploadResponse(response);
              return JSON.parse(response);
            },
            onerror: (error) => {
              console.error("Upload error:", error);
            },
          },
        }}
        acceptedFileTypes={["application/pdf"]}
        labelFileTypeNotAllowed="Please upload a PDF resume file"
        fileValidateTypeLabelExpectedTypes="Expects a PDF file"
      />
    </div>
  );
};

export default FileUpload;
