#!/usr/bin/env node
import { Command } from "commander";
import { setup } from "./setup";
import { exec } from "./exec";
const program = new Command();

program
  .name('deploy')
  .version('0.0.1')
  .option('-c, --config <path>', 'set config path', './deploy.conf');


program.addCommand(setup,);

// program.addCommand(exec);
  
program.parse();