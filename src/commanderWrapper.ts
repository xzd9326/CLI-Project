import {Command} from 'commander'
import { IApp } from './type';

const commanderWrapper = (app: IApp) => {
  const program = new Command();
  program
    .version(app.version || '')
    .description(app.description || '')
  
  // Options
  if (app.option) {
    app.option.map((op) => {
      program
        .option(op.name, op.description || '', op.default || '')
    })
  }

  program.parse();
}


const newApp: IApp = {
  name: 'cms',
  version: '1.0.0',
  description: 'Contact Management System',
  option: [{name: '-s, --small', description: 'small pizza size'},
            {name: '-c, --cheese <type>', description: 'add the specified type of cheese', default: 'blue'}
          ]
}

commanderWrapper(newApp);