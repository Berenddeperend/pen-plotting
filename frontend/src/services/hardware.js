export default function initHardware() {
  // Check if the browser supports the Web Serial API
  if ("serial" in navigator) {
    console.log("Web Serial API is supported");
  } else {
    console.warn("Web Serial API is not supported by this browser.");
  }

  // Function to connect to the Arduino
  async function connectToArduino() {
    try {
      // Request a port and open a connection
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 }); // Match the baud rate of your Arduino sketch

      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      console.log("Connected to Arduino. Reading data...");

      // Read loop
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          console.log("Stream closed");
          break;
        }
        if (value) {
          console.log(`Received: ${value}`);
        }
      }

      reader.releaseLock();
    } catch (err) {
      console.error("There was an error:", err);
    }
  }

  // Call the function to connect when the user clicks a button (or similar)
  document
    .querySelector("#connectButton")
    .addEventListener("click", connectToArduino);
}
