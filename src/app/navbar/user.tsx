import User1 from "./user1";
import User2 from "./user2";

const User = ({ authState, userNameState, setAuthState }: any) => {
  return (
    <div className="flex p-0 items-center">
      <div className="mx-auto flex w-full items-center justify-center">
        <div className="group relative cursor-pointer ml-10">
          <User1 authState={authState} userNameState={userNameState} />
          <User2 authState={authState} setAuthState={setAuthState} />
        </div>
      </div>
    </div>
  );
};

export default User;
