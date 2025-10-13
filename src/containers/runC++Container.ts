import createContainer from './containerFactory';
import { CPP_IMAGE } from '../utills/constants';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullImage';

function escapeForShell(str: string): string {
  return str
    .replace(/\\/g, '\\\\')   // escape backslashes
    .replace(/"/g, '\\"')     // escape double quotes
    .replace(/\$/g, '\\$')    // escape $
    .replace(/`/g, '\\`')     // escape backticks
    .replace(/\n/g, '\\n');   // preserve newlines as \n
}

async function runCpp(code: string, safeInput: string) {
  console.log("Initializing the Docker container for C++...");

  const escapedCode = escapeForShell(code);

  // Create, compile, and run main.cpp inside the container
  const command = [
    "/bin/sh",
    "-c",
    `printf "%b" "${escapedCode}" > main.cpp && g++ main.cpp -o main && printf "%s" "${safeInput}" | ./main`,
  ];

  await pullImage(CPP_IMAGE);

  const container = await createContainer(CPP_IMAGE, command);

  await container.start();
  console.log("Started the C++ Docker container");

  const loggerStream = await container.logs({
    follow: true,
    stdout: true,
    stderr: true,
  });

  const rawLogBuffer: Buffer[] = [];

  loggerStream.on("data", (chunk) => rawLogBuffer.push(chunk));

  await new Promise<void>((resolve) => loggerStream.on("end", resolve));

  const completeBuffer = Buffer.concat(rawLogBuffer);
  const decodedStream = decodeDockerStream(completeBuffer);

  console.log("Decoded Stream:", decodedStream);

  // Clean up container after execution
  await container.remove({ force: true });

  return decodedStream;
}

export default runCpp;
