import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { bytesToSize } from "../util";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "2px dotted gray", //  #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  textAlign: "left",
  height: 75,
  overflow: "hidden",
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  marginLeft: 4
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export function FileDrop({ files, setFiles }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log("files", acceptedFiles);
      // if (!acceptedFiles.length !== 1) {
        // alert('Please upload one file')
        // return
      // }
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <img src={file.preview}/>
      <div style={thumbInner}>
        <p>
          <b>{file.name}</b>
          <br />
          {file.size && (
            <span>
              Size: {bytesToSize(file.size)}
              <br />
            </span>
          )}
          {file.type && <span>Type: {file.type}</span>}
        </p>
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop a logo here, or click to select file</p>
      </div>
      <br />
      <b>Preview:</b>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}