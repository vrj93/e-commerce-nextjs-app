import User1 from "./user1";
import User2 from "./user2";

const User = () => {
  return (
    <div className="flex items-center">
      <div className="mx-auto flex w-full items-center justify-center">
        <div className="group relative cursor-pointer">
          <User1 />
          <User2 />
        </div>
      </div>
    </div>
  );
};

export default User;
