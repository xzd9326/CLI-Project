#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
const program = new Command();

const exec = new Command ('exec')
  .alias('ex')
  .argument('<script>')
  .description('execute the given remote cmd')
  .option('-e, --exec_mode <mode>', 'Which exec mode to use', 'fast')
  .action((script, options) => {
    console.log('read config from %s', program.opts().config);
    console.log('exec "%s" using %s mode and config %s', script, options.exec_mode, program.opts().config);
  }).addHelpText('after', `
  Examples:
  $ deploy exec sequential
  $ deploy exec async`
  )
  .exitOverride();  

program
  .name('deploy')
  .version('0.0.1')
  .option('-c, --config <path>', 'set config path', './deploy.conf');

program
  .command('setup [env]')
  .description('run setup commands for all envs')
  .option('-s, --setup_mode <mode>', 'Which setup mode to use', 'normal')
  .action((env, options) => {
    env = env || 'all';
    console.log('read config from %s', program.opts().config);
    console.log('setup for %s env(s) with %s mode', env, options.setup_mode);
  });

program
  .addCommand(exec)

program
  .action(async (options, command) => {
    let exited = false;
    const replCommand = new Command(`${command.name()}`)
      .addHelpText("afterAll", `\nREPL mode: skip delimiter \`${command.name()}>\` and call commands directly.`)
      .usage(`[command]`)
  replCommand
    .command("exit")
    .description("Exit the program.")
    .action(async () => {
      console.log(`Exiting...`);
      exited = true;
    });
  
  replCommand
    .addCommand(exec)


  while (!exited) {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "cmd",
        message: `${command.name()}>`,
        prefix: "",
      },
    ]);
    const argv = answers.cmd.trim().split(" ");
    if (argv[0] === "") {
      continue;
    }

    try {
      await replCommand.parseAsync(argv, { from: "user" });
    } catch (e: any) {
      if (e?.name !== "CommanderError") {
        console.log(e);
      }
    }

  }
  })
  
program.parse();