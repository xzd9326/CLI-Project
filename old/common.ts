import { Command } from "commander";

export const addMainCommand = (
  newCommand: Command,
  name: string,
  description: string,
  helpText?: string
): void => {
  const command = newCommand
    .command(name)
    .description(description)
  if (helpText) {
    command.addHelpText("after", helpText)
  }
};