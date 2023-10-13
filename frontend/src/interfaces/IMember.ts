import { GendersInterface } from "./IGender";

export interface MembersInterface {
    member_id?: number;
	Email?:     string;
	Username?:  string;
	Password?:  string;

	GenderID?: number;
  	Gender?: GendersInterface;
  }


  