import React, { createContext, useContext, useState } from 'react';
import { MembersInterface } from '../interfaces/IMember';

const reactContext = createContext({ member: null as MembersInterface | null, login: (memberData: MembersInterface | null) => {}, logout: () => {} });

export const useMember = () => {
  return useContext(reactContext);
};

export const MemberProvider = ({ children }: { children: React.ReactNode }) => {
  const [member, setMember] = useState<MembersInterface | null>(null);

  const login = (memberData: MembersInterface | null) => {
    setMember(memberData);
  };

  const logout = () => {
    setMember(null);
  };

  return (
    <reactContext.Provider value={{ member, login, logout }}>
      {children}
    </reactContext.Provider>
  );
};