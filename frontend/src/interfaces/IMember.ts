import { GendersInterface } from "./IGender";

export interface MembersInterface {
	Email?:     string;
	Username?:  string;
	Password?:  string;
	HashedPassword?: string;
	
	GenderID?: number;
  	Gender?: GendersInterface;
  }


  