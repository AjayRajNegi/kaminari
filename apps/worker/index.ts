import cors from "cors";
import express from "express";
import { prismaClient } from "db/client";
import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt } from "./systemPrompt";
import { onFileUpdate, onPromptEnd, onShellCommand } from "./os";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/prompt", async (req, res) => {
  const { prompt, projectId } = req.body;
  const client = new Anthropic();

  //   Looks up the project in the database
  const project = await prismaClient.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!project) {
    res.status(404).json({ error: "Project not found!" });
  }

  //   Save the user prompt in the datebase
  const promptDb = await prismaClient.prompt.create({
    data: {
      content: prompt,
      projectId,
      type: "USER",
    },
  });

  // Notify system via websocket
  const { diff } = await RelayWebsocket.getInstance().sendAndAwaitResponse(
    {
      event: "admin",
      data: { type: "prompt-start" },
    },
    promptDb.id
  );

  if (diff) {
    await prismaClient.prompt.create({
      data: {
        content: `<bolt-user-diff>${diff}</bolt-user-diff>\n\n$`,
        projectId,
        type: "USER",
      },
    });
  }

  // Fetches all prompt from this project
  const allPrompts = await prismaClient.prompt.findMany({
    where: { projectId },
    orderBy: { createdAt: "asc" },
  });

  // Prepare to process Artifacts
  // Creates a new Artifact Instance
  let artifactProcessor = new ArtifactProcessor("", filePath, fileContent)=>onFileUpdate(filePath,parseJsonConfigFileContent, projectId, promoDb.id, project.type), (shellCommand)=>onShellCommand(shellCommand, projectId, promptDb.id);

  // Stream AI response 
  let artifact = "";
// Starts a streaming session with claude
// Sends all past prompts as messages
  let response = client.messages.stream({
    messages: allPrompts.map((p:any)=>({role:p.type === "USER" ? "user":"assistant", content: p.content})),
    system: systemPrompt(project.type),
    model: "claude-3-7-sonnet-20250219", max_tokens: 8080,
  })//Every time Claude streams a chunk of text it's added to processor.
  .on('text', (text)=>{
    artifactProcessor.append(text);
    artifactProcessor.parse();
    artifact += text;
  })//Once the AI finishes responding it saves the full Artifact as a system prompt
  .on('finalMessage', async(message)=>{
    console.log("done!");
    await prismaClient.prompt.create({
      data:{
        await prismaClient.prompt.create({
          data:{
            content: artifact/\,
            projectId,
            type:"SYSTEM"
          }
        })
      }
    })
  }).on('error',(error)=>{console.log("error", error)})
  
  res.json({response});

});

app.listen(9091, ()=>{console.log("Server is running on port 9091")})