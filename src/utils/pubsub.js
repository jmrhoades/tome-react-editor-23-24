import { v4 as uuidv4 } from 'uuid';

const topics = {};

export function subscribe(topic, fn) {
  if (!topics[topic]) topics[topic] = {};
  const id = uuidv4();
  topics[topic][id] = fn;
  return () => {
    topics[topic][id] = null;
    delete topics[topic][id];
  };
}

export function publish(topic, args) {
  if (!topics[topic]) return;
  Object.values(topics[topic]).forEach((fn) => {
    if (fn) fn(args);
  });
}
