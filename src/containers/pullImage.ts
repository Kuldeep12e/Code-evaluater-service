import Docker from "dockerode";

async function pullImage(imageName: string): Promise<void> {
  const docker = new Docker();

  console.log(`Pulling image: ${imageName}...`);

  return new Promise((resolve, reject) => {
    docker.pull(imageName, (err:Error, stream:NodeJS.ReadableStream) => {
      if (err) {
        console.error(`Failed to start pulling image ${imageName}:`, err);
        return reject(err);
      }

      docker.modem.followProgress(
        stream,
        (err: any, res: any) => {
          if (err) {
            console.error(`Error while pulling image ${imageName}:`, err);
            return reject(err);
          }
          console.log(`Image pulled successfully: ${imageName}`);
          resolve();
        },
        (event: any) => {
          if (event.status) console.log(event.status);
        }
      );
    });
  });
}

export default pullImage;
