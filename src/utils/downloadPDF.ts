/**
 * Utility function to handle PDF download from a server response
 * @param response The response object from the fetch call
 * @returns A promise that resolves when the download is initiated
 * @throws Error if the Content-Disposition header is missing or invalid
 */

export async function handlePdfDownload(response: Response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Get the Content-Disposition header
  const contentDisposition = response.headers.get("Content-Disposition");
  if (!contentDisposition) {
    throw new Error("Content-Disposition header is missing");
  }

  // Extract the filename from the Content-Disposition header
  const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
  if (!filenameMatch || !filenameMatch[1]) {
    throw new Error("Invalid Content-Disposition header format");
  }

  const filename = filenameMatch[1].trim();

  // Get the PDF as a blob
  const blob = await response.blob();

  // Create a URL for the blob
  const url = window.URL.createObjectURL(blob);

  // Create a link element and trigger the download
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  // Clean up
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
