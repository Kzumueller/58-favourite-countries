"use client"

import {useCallback, useEffect, useState} from "react";
import {validateUserName} from "@/src/actions/db/user/validateUserName";
import {Card} from "@/src/components/layout/Card";
import {Spinner} from "@/src/components/misc/Spinner";
import {Input} from "@/src/components/input/Input";

type Props = {
  onSubmit: (username: string, password: string) => Promise<void>;
  showAvailability: boolean
}

export const UserForm = ({onSubmit, showAvailability}: Props) => {
  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);

  /**
   * checks whether the given username is still available
   */
  const checkAvailability = useCallback(async (username: string) => {
    const valid = await validateUserName(username);

    setUsernameValid(valid);
  }, []);

  /** checks availability when username changes */
  useEffect(() => {
    if(showAvailability) checkAvailability(username)
  }, [showAvailability, checkAvailability, username]);

  return <div className="flex justify-center items-center w-full h-screen">
    <Card
      title={"Create an account"}
      footer={<button
        disabled={!username || !usernameValid || !password}
        className="btn btn-primary"
        onClick={() => onSubmit(username, password)}
      >{submitting && <Spinner />} Create</button>
      }
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full">
          <Input
            placeholder="User name"
            value={username}
            onChange={setUsername}
          />
        </div>
        {showAvailability && username && <div className="flex flex-row justify-end w-full italic text-xs mt-1">{
          usernameValid
            ? <span className="text-green-600">Available</span>
            : <span className="text-red-600">Unavailable</span>
        }</div>}

        <div className="flex flex-row mt-3 w-full">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
          />
        </div>
      </div>
    </Card>
  </div>
}