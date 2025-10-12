import DockerStreamOuput from "../types/dockerStreamOuput";
import { DOCKER_STREAM_HEADER_SIZE } from "../utills/constants";

/**
 * Docker multiplexed stream format:
 * [0:0] - stream type (1=stdout, 2=stderr)
 * [1:3] - unused
 * [4:7] - big-endian uint32 chunk length
 * [8..] - chunk data
 */

function decodeDockerStream(buffer: Buffer): DockerStreamOuput {
  let offset = 0; // keeps track of the current position in the buffer

  // Initialize output
  const output: DockerStreamOuput = { stdout: "", stderr: "" };

  while (offset < buffer.length) {
    // Read header
    const channel = buffer[offset]; // 1 = stdout, 2 = stderr
    const length = buffer.readUInt32BE(offset + 4); // length of the chunk
    offset += DOCKER_STREAM_HEADER_SIZE; // move past header

    // Extract the data chunk
    const chunk = buffer.slice(offset, offset + length);
    const chunkString = chunk.toString("utf8");

    // Append to appropriate stream
    if (channel === 1) {
      output.stdout += chunkString;
    } else if (channel === 2) {
      output.stderr += chunkString;
    }

    // Move offset past this chunk
    offset += length;
  }

  return output;
}

export default decodeDockerStream;
