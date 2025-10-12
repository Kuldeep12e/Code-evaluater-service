// Factory refer to creation of the object

import Docker from 'dockerode'

async function createContainer(imageName:string , cmdExecutable:string[]){
    const docker = new Docker();

    const container = await docker.createContainer({
        Image: imageName,
        Cmd:cmdExecutable,
        AttachStdin: true, //for input stream
        AttachStdout: true, // for Ouput stream
        AttachStderr: true, // for error stream
        Tty: false,
        OpenStdin: true, //keep the input stream open even no intereaction is there
    })


    return container
}

export default createContainer;