import createContainer from './containerFactory';
import { PYTHON_IMAGE } from '../utills/constants';
import decodeDockerStream from './dockerHelper';

// Escape for shell to avoid syntax breaking
function escapeForShell(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\$/g, '\\$')
    .replace(/`/g, '\\`')
    .replace(/\n/g, '\\n'); // preserve newlines
}

// regex -> 

async function runPython(code: string, safeInput: string) {
  console.log("Initializing the Docker container...");

  const escapedCode = escapeForShell(code);

    const command = [
      "/bin/sh",
      "-c",
      `printf "%s" '${code}' > test.py && printf "%s" "${safeInput}" | python3 test.py`,
    ];

  const container = await createContainer(PYTHON_IMAGE, command);

  await container.start();
  console.log("Started the Docker container");

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

  await container.remove({ force: true });
  return decodedStream;
}

export default runPython;
