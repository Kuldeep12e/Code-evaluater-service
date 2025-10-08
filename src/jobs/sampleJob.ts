import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefintion";

export class SampleJob implements IJob {
  name: string;
  payload?: Record<string, unknown>;

  constructor(payload: Record<string, unknown>) {
    this.name = this.constructor.name; 
    this.payload = payload; 
  }

  handle = () => {
    console.log(`Processing job: ${this.name}`);
    console.log("Payload:", this.payload);
  }

  
  failed(job?: Job): void {
    console.error(`Job ${this.name} failed.` , job?.id);
  }
}
