// @flow
// import { version, name } from '../../package.json';

export type Options = {|
  source: string,
  dest: string,
  verbose: boolean,
|};

// import prog from 'caporal';

// export const parseCliArgs = async (): Promise<Options> => {
//   const p = new Promise(resolve => {
//     prog
//       .version(version)
//       .usage('npm run start [options]')
//       .option('-s, --source', 'Path to JSON schema.', null, null, true)
//       .option('-d, --dest', 'Destination for js module.', null, null, true)
//       .option('-v, --verbose', 'Verbose output.', null, null, false)
//       .action((args, opts, logger) => {
//         console.log('AAAAAAA', args, opts, logger);
//         const { source, dest, verbose } = opts;
//         const options = {
//           source,
//           dest,
//           verbose: verbose || false,
//         };
//         resolve(options);
//       });
//   });
//   prog.parse(process.argv);
//   return p;
// };

export const parseCliArgs = (): Options => {
  console.log('ARGV:', process.argv);
  return {
    source: process.argv[2],
    dest: process.argv[3],
    verbose: !!process.argv[4],
  };
};
