import { Command } from "commander";

export const exec = new Command()

exec
  .command('exec <script>')
  .name('exec')
  .alias('ex')
  .description('execute the given remote cmd')
  .option('-e, --exec_mode <mode>', 'Which exec mode to use', 'fast')
  .action((script, options) => {
    console.log('read config from %s', exec.opts().config);
    console.log('exec "%s" using %s mode and config %s', script, options.exec_mode, exec.opts().config);
  }).addHelpText('after', `
Examples:
  $ deploy exec sequential
  $ deploy exec async`
  );