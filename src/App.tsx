import "./App.css";

// Assets
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

// Amplify UI
import "@aws-amplify/ui-react/styles.css";
import { Button, Image, Authenticator } from "@aws-amplify/ui-react";

// Amplify Backend
import { Amplify } from "aws-amplify";
import config from "./aws-exports";

Amplify.configure(config);

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <div>
            <>{console.log(user)}</>
            <a href="https://vitejs.dev" target="_blank">
              <Image
                src={viteLogo}
                className="logo"
                height={80}
                paddingRight={20}
                alt="Vite logo"
              />
            </a>
            <a href="https://react.dev" target="_blank">
              <Image
                src={reactLogo}
                className="logo"
                height={80}
                alt="React logo"
              />
            </a>
          </div>
          <h1>User: {user?.username}</h1>
          <h3>Email: {user?.attributes?.email}</h3>
          <Button onClick={signOut} variation="primary">
            Sign Out
          </Button>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
