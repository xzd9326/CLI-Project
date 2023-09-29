export interface IApp {
  name: string;
  version?: string;
  description?: string;
  // option?: IOption[];
  // argument?: IArgument[];
  actions?: IAction;
  param: IParam[];
}

export interface IOption {
  name: string;
  description?: string;
  default?: string; //Default option value
}

export interface IArgument {
  name: string; //<required> or [optional]
  description?: string;
}


export interface IAction {
   name: string;
   content: () => void;
}

interface IParam {
  // value: () => any;

}

const readParamValue = (param: IParam) => {

}