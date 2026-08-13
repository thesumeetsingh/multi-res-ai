package com.sumeet.multires_backend.controller;


import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.google.genai.GoogleGenAiChatModel;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/ollama")
public class OllamaController {
    private ChatClient chatClient;

    public OllamaController(OllamaChatModel chatModel){
        this.chatClient= org.springframework.ai.chat.client.ChatClient.create(chatModel);
    }

    @GetMapping("/{message}")
    public ResponseEntity<String> getResponse(@PathVariable String message){

//        String response= chatModel.call(message);
        String response= chatClient.prompt(message).call().content();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
