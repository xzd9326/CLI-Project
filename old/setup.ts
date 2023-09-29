import { Command } from "commander";

export const setup = new Command()

setup
  .name('setup')
  .description('run setup commands for all envs')
  .option('-s, --setup_mode <mode>', 'Which setup mode to use', 'normal')
  .action((env, options) => {
    env = env || 'all';
    console.log('read config from %s', setup.opts().config);
    console.log('setup for %s env(s) with %s mode', env, options.setup_mode);
  });