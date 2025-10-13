import createContainer from './containerFactory';
import { JAVA_IMAGE } from '../utills/constants';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullImage';

function escapeForShell(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\$/g, '\\$')
    .replace(/`/g, '\\`')
    .replace(/\n/g, '\\n');
}

async function runJava(code: string, safeInput: string) {
  console.log("Initializing the Docker container for Java...");

  const escapedCode = escapeForShell(code);

  // Create, compile, and run Main.java inside the container
            const command = [
            "/bin/sh",
            "-c",
            `printf "%b" "${code}" > Main.java && javac Main.java && printf "%s" "${safeInput}" | java Main`,
            ];
 await pullImage(JAVA_IMAGE)

  const container = await createContainer(JAVA_IMAGE, command);

  await container.start();
  console.log("Started the Java Docker container");

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

export default runJava;
