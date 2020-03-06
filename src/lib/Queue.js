import Bee from 'bee-queue';
import OrderDetailsMail from '../app/jobs/orderDetailsMail';
import CancelDeliveryMail from '../app/jobs/cancelDeliveryMail';
import redisConfig from '../config/redis';

const jobs = [OrderDetailsMail, CancelDeliveryMail];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED: ${err}`);
  }
}

export default new Queue();
