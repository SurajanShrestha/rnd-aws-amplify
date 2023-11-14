import "./App.css";

// Assets
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

// React
import { useState } from "react";

// Amplify UI
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Image,
  Authenticator,
  TextField,
  Text,
  Flex,
  View,
} from "@aws-amplify/ui-react";

// Amplify Backend
import { Amplify, API } from "aws-amplify";
import config from "./aws-exports";

// Components
import TaskActionMenu from "./components/TaskActionsMenu";

Amplify.configure(config);

// API Config
const apiName = "rndamplifyapi";
const path = "/todo";
const myInit = {
  headers: {}, // OPTIONAL
  response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
  queryStringParameters: {
    name: "param", // OPTIONAL
  },
};

interface TodoData {
  name?: string;
}

function App() {
  const [todo, setTodo] = useState("");
  // Fetched Data
  const [data, setData] = useState<TodoData[]>([]);

  // GET
  const getTodos = () => {
    API.get(apiName, path, myInit)
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => console.log(err));
  };

  // POST
  const handleSubmit = () => {
    const init = {
      body: { name: todo },
    };
    API.post(apiName, path, init)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <div>
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

          {/* Post */}
          <div className="box">
            <TextField
              descriptiveText="Enter a Todo"
              placeholder="Go to the Gym"
              label="Task Name"
              errorMessage="Error"
              onChange={(e) => setTodo(e?.target?.value)}
            />
            <Button
              variation="menu"
              marginTop={8}
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>

          <Button onClick={getTodos} variation="primary" marginRight={10}>
            Get Todos
          </Button>
          <Button onClick={signOut} variation="primary">
            Sign Out
          </Button>

          {/* List */}
          <View className="box" maxWidth={400}>
            <Flex direction="column" alignItems="start" justifyContent="center">
              {data?.map((d, idx) => (
                <Flex justifyContent="space-between" width={"100%"}>
                  <Text key={idx} textAlign={"left"}>
                    👉 {d?.name}
                  </Text>
                  <View>
                    <TaskActionMenu />
                  </View>
                </Flex>
              ))}
            </Flex>
          </View>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
