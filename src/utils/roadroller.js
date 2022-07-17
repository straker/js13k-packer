import { Packer } from 'roadroller';
import { roadrollerDefaults } from '../constants.js';

export default async function roadroller(data, roadrollerOptions) {
  if (roadrollerOptions == false) return data;
  if (roadrollerOptions === true) {
    roadrollerOptions = roadrollerDefaults
  }

  const { input, options, optimize } = roadrollerOptions;
  const inputs = [
    {
      data,
      ...input
    }
  ];
  const packer = new Packer(inputs, options);
  await packer.optimize(optimize);
  const { firstLine, secondLine } = packer.makeDecoder();
  return firstLine + '\n' + secondLine;
}