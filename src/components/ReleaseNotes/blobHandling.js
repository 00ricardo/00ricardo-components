import pako from 'pako';

// Function to convert a Blob to Base64
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(blob);
  });
};

// Function to compress Blob and convert to Base64
export const compressAndConvertToBase64 = async (blob) => {
  // Read the Blob as an ArrayBuffer
  const arrayBuffer = await blob.arrayBuffer();

  // Compress the data using pako (Gzip)
  const compressed = pako.gzip(new Uint8Array(arrayBuffer));

  // Create a new Blob with compressed data
  const compressedBlob = new Blob([compressed], {
    type: 'application/octet-stream',
  });

  // Convert the compressed Blob to Base64
  const base64 = await blobToBase64(compressedBlob);

  // Remove the `data:*/*;base64,` prefix if necessary
  return base64.split(',')[1];
};

export const base64ToBlobUrl = (base64) => {
  // Decode the Base64 string to binary data
  const binary = atob(base64);
  const binaryArray = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    binaryArray[i] = binary.charCodeAt(i);
  }

  // Decompress the binary data using pako
  const decompressed = pako.ungzip(binaryArray);

  // Create a Blob from the decompressed data
  const blob = new Blob([decompressed], { type: 'image/png' }); // Adjust the type if needed (e.g., 'image/jpeg')

  // Create a URL for the Blob
  return URL.createObjectURL(blob);
};
