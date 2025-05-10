import { Chat } from "./Chat";
import { getUsername } from "./utils";

export const App = () => {
  const username = getUsername();
  if (!username) {
    return (
      <span>
        <h1>404</h1>
        <p>Username not found</p>
      </span>
    );
  }

  return <Chat username={username} />;
};
