"use client";
import axios from "axios";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { BACKEND_URL } from "@/config";

export default function Prompt() {
  const [prompt, setPrompt] = useState("");
  const { getToken } = useAuth();
  return (
    <div className="flex flex-col gap-2">
      <Textarea
        placeholder="Create a chess application..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button
        onClick={async () => {
          const token = await getToken();
          const response = await axios.post(
            `${BACKEND_URL}/project`,
            { prompt: prompt },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
        }}
        className="w-fit ml-auto"
      >
        Send
      </Button>
    </div>
  );
}
