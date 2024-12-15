import { Books } from "./books.model";

export function downloadJSONFile(data: Books[], filename = 'data.json') {
    const jsonStr = JSON.stringify(data, null, 2); // Convert data to JSON string
    const blob = new Blob([jsonStr], { type: 'application/json' }); // Create a Blob
    const link = document.createElement('a'); // Create a download link
    link.href = URL.createObjectURL(blob); // Set the link's href to the Blob URL
    link.download = filename; // Set the desired file name
    link.click(); // Trigger the download
}